"""Search read-only runtime snapshots written by runtime_export.js (stdlib only)."""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESOURCE = re.compile(r"^#?[a-z0-9_.-]+:[a-z0-9_./-]+$")
OUTPUT_FIELDS = {
    'result', 'results', 'output', 'outputs', 'item_output', 'item_outputs',
    'fluid_output', 'fluid_outputs', 'fluidOutputs', 'chemical_output',
    'chemical_outputs', 'gas_output', 'left_chemical_output',
    'right_chemical_output', 'left_gas_output', 'right_gas_output',
}
INPUT_FIELDS = {
    'ingredient', 'ingredients', 'input', 'inputs', 'item_input', 'item_inputs',
    'fluid_input', 'fluid_inputs', 'fluidInput', 'chemical_input',
    'chemical_inputs', 'gas_input', 'left_input', 'right_input', 'base',
    'addition', 'template', 'key',
}


def lines(path):
    # Runtime exports use small JSON-array batches through KubeJS's permitted
    # JsonIO API. Also accept JSONL snapshots for tooling and interoperability.
    directory = path.with_suffix('') if path.suffix == '.jsonl' else path
    if directory.is_dir():
        for batch in sorted(directory.glob('*.json')):
            yield from json.loads(batch.read_text(encoding='utf-8'))
        return
    with path.open(encoding='utf-8') as stream:
        for line in stream:
            if line.strip():
                yield json.loads(line)


def load_snapshot(base):
    pointer = json.loads((base / 'latest.json').read_text(encoding='utf-8'))
    name = pointer['snapshot']
    if Path(name).name != name or not name.startswith('snapshot-'):
        raise ValueError('Invalid snapshot pointer')
    folder = base / name
    manifest = json.loads((folder / 'manifest.json').read_text(encoding='utf-8'))
    return folder, manifest


def references(value):
    """Read ingredient/output resource references without interpreting quantities."""
    found = set()
    if isinstance(value, str):
        value = re.sub(r'^\d+\s*x?\s+', '', value)
        if RESOURCE.fullmatch(value):
            found.add(value)
    elif isinstance(value, list):
        for entry in value:
            found.update(references(entry))
    elif isinstance(value, dict):
        for key, entry in value.items():
            if key == 'type':
                continue
            if key == 'tag' and isinstance(entry, str):
                found.add('#' + entry.lstrip('#'))
            else:
                found.update(references(entry))
    return found


def recipe_references(data, usage):
    fields = INPUT_FIELDS if usage else OUTPUT_FIELDS
    result = set()
    for key in fields:
        if key in data:
            result.update(references(data[key]))
    if usage:
        # Sequenced assembly has additional consumed materials in each step.
        for step in data.get('sequence', []):
            result.update(recipe_references(step, True))
    return result


def find_items(folder, args):
    terms = [term.casefold() for term in args.query]
    rows = []
    files = ['items.jsonl', 'fluids.jsonl'] if args.fluids else ['items.jsonl']
    for filename in files:
        for row in lines(folder / filename):
            if args.mod and row['mod'] != args.mod:
                continue
            if args.tag and args.tag.lstrip('#') not in row.get('tags', []):
                continue
            text = ' '.join([row['id'], row.get('name', ''), *row.get('tags', [])]).casefold()
            if not all(term in text for term in terms):
                continue
            name, item_id = row.get('name', '').casefold(), row['id'].casefold()
            score = sum(8 * (term in name) + 4 * (term in item_id) for term in terms)
            phrase = ' '.join(terms)
            score += 30 * (phrase == name) + 15 * name.startswith(phrase)
            rows.append((score, row))
    rows.sort(key=lambda pair: (-pair[0], pair[1]['id']))
    return [row for _, row in rows[:args.limit]], len(rows)


def find_recipes(folder, args):
    wanted = args.item
    item_tags = set()
    for filename in ['items.jsonl', 'fluids.jsonl']:
        for row in lines(folder / filename):
            if row['id'] == wanted:
                item_tags.update('#' + tag for tag in row.get('tags', []))
    matches = []
    total = 0
    for row in lines(folder / 'recipes.jsonl'):
        if args.type and row['data'].get('type') != args.type:
            continue
        refs = recipe_references(row['data'], args.command == 'uses')
        matched = refs & ({wanted} | item_tags)
        if matched:
            total += 1
            if len(matches) < args.limit:
                matches.append(dict(row, matched=sorted(matched)))
    return matches, total


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data', type=Path, default=ROOT / 'local/144craft-runtime')
    sub = parser.add_subparsers(dest='command', required=True)
    search = sub.add_parser('search', help='Find items by name, ID, mod and tags')
    search.add_argument('query', nargs='*')
    search.add_argument('--mod')
    search.add_argument('--tag')
    search.add_argument('--fluids', action='store_true', help='Include fluids')
    for command in ['recipes', 'uses']:
        lookup = sub.add_parser(command, help='Find output recipes' if command == 'recipes' else 'Find consuming recipes')
        lookup.add_argument('item', help='Exact item/fluid ID, or #namespace:tag')
        lookup.add_argument('--type', help='Filter by recipe serializer ID')
    sub.add_parser('status', help='Show snapshot age, counts and export errors')
    get = sub.add_parser('recipe', help='Read one complete recipe by recipe ID')
    get.add_argument('id')
    for child in sub.choices.values():
        child.add_argument('--json', action='store_true', help='Machine-readable output')
        child.add_argument('--limit', type=int, default=20)
    args = parser.parse_args(argv)
    if args.limit < 1:
        parser.error('--limit must be positive')
    try:
        folder, manifest = load_snapshot(args.data)
        if args.command == 'status':
            print(json.dumps(manifest, ensure_ascii=False, indent=2))
            return 0
        if args.command == 'search':
            rows, total = find_items(folder, args)
        elif args.command == 'recipe':
            rows = [row for row in lines(folder / 'recipes.jsonl') if row['id'] == args.id]
            total = len(rows)
        else:
            if not RESOURCE.fullmatch(args.item):
                parser.error('Use an exact resource ID such as alltheores:steel_ingot')
            rows, total = find_recipes(folder, args)
        if args.json or args.command != 'search':
            print(json.dumps({'snapshot': manifest['snapshot'], 'exported_at': manifest['exported_at'],
                              'export_errors': manifest.get('counts', {}).get('errors', 0),
                              'total_matches': total, 'results': rows}, ensure_ascii=False, indent=2))
        else:
            print(f"{total} matches; showing {len(rows)}. Snapshot: {manifest['exported_at']}")
            for row in rows:
                print(f"{row['id']} | {row.get('name', '')}")
                if row.get('tags'):
                    print('  tags: ' + ', '.join('#' + tag for tag in row['tags']))
        return 0
    except FileNotFoundError as error:
        print('No complete runtime export found. Enter a world and wait for [PACK_DATA] Exported, '
              'or run /packdata export. On multiplayer, install the script on the server '
              'or export in a local singleplayer world. Missing: ' + str(error.filename), file=sys.stderr)
        return 2
    except (ValueError, KeyError) as error:
        print('Invalid runtime snapshot: ' + str(error), file=sys.stderr)
        return 2


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    raise SystemExit(main())
