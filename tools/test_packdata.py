import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
import packdata


class RuntimeQueries(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.folder = self.root / 'snapshot-test'
        self.folder.mkdir()
        self.write('items.jsonl', [
            {'id': 'test:steel_plate', 'mod': 'test', 'name': 'Steel Plate', 'tags': ['c:plates/steel']},
            {'id': 'other:steel_frame', 'mod': 'other', 'name': 'Steel Frame', 'tags': []},
        ])
        self.write('fluids.jsonl', [{'id': 'test:oil', 'mod': 'test', 'name': 'Test Oil', 'tags': []}])
        self.write('recipes.jsonl', [
            {'id': 'test:press', 'data': {'type': 'create:pressing', 'ingredients': [{'item': 'test:steel_ingot'}], 'results': [{'id': 'test:steel_plate', 'count': 2}]}},
            {'id': 'test:machine', 'data': {'type': 'modern_industrialization:assembler', 'item_inputs': [{'tag': 'c:plates/steel', 'amount': 4}], 'item_outputs': [{'item': 'other:steel_frame', 'amount': 1}]}},
            {'id': 'test:sequence', 'data': {'type': 'create:sequenced_assembly', 'ingredient': {'item': 'test:blank'}, 'sequence': [{'type': 'create:deploying', 'ingredients': [{'item': 'test:blank'}, {'item': 'test:steel_plate'}]}], 'results': [{'id': 'test:mechanism'}]}},
        ])
        (self.folder / 'manifest.json').write_text(json.dumps({'snapshot': 'snapshot-test', 'exported_at': 'test', 'counts': {'errors': 1}}))
        (self.root / 'latest.json').write_text(json.dumps({'snapshot': 'snapshot-test'}))

    def write(self, name, rows):
        (self.folder / name).write_text(''.join(json.dumps(row) + '\n' for row in rows))

    def query(self, *args):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            code = packdata.main(['--data', str(self.root), *args, '--json'])
        self.assertEqual(code, 0)
        return json.loads(output.getvalue())

    def test_search_by_name_mod_and_tag(self):
        data = self.query('search', 'steel', '--mod', 'test', '--tag', 'c:plates/steel')
        self.assertEqual([row['id'] for row in data['results']], ['test:steel_plate'])
        self.assertEqual(data['export_errors'], 1)

    def test_uses_expands_tags_and_sequence_steps(self):
        data = self.query('uses', 'test:steel_plate')
        self.assertEqual({row['id'] for row in data['results']}, {'test:machine', 'test:sequence'})

    def test_output_lookup_preserves_counts_and_excludes_consumers(self):
        data = self.query('recipes', 'test:steel_plate')
        self.assertEqual([row['id'] for row in data['results']], ['test:press'])
        self.assertEqual(data['results'][0]['data']['results'][0]['count'], 2)

    def test_fluid_search_and_recipe_id_lookup(self):
        self.assertEqual(self.query('search', 'oil', '--fluids')['results'][0]['id'], 'test:oil')
        self.assertEqual(self.query('recipe', 'test:machine')['results'][0]['data']['item_inputs'][0]['amount'], 4)

    def test_incomplete_snapshot_does_not_silently_return_empty_results(self):
        (self.folder / 'manifest.json').unlink()
        with contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(packdata.main(['--data', str(self.root), 'search', 'steel']), 2)

    def test_runtime_json_batches(self):
        for kind in ['items', 'fluids', 'recipes']:
            source = self.folder / (kind + '.jsonl')
            rows = list(packdata.lines(source))
            directory = self.folder / kind
            directory.mkdir()
            (directory / '000000.json').write_text(json.dumps(rows))
            source.unlink()
        self.assertEqual(self.query('search', 'plate')['results'][0]['id'], 'test:steel_plate')
        self.assertEqual(self.query('uses', 'test:steel_plate')['total_matches'], 2)


if __name__ == '__main__':
    unittest.main()
