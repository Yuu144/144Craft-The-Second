ServerEvents.recipes(e => {
    //Gearbox Recipe:
    smithing_deploying(
        e,
        'create:gearbox',
        'createmechanisms:wooden_mechanism',
        'create:andesite_casing',
        'create:cogwheel',
        false
    )
    //Gearbox and Vertical Gearbox Alternation Recipe:
    alternate(
        e,
        'create:gearbox',
        'create:vertical_gearbox'
    )
    //Clutch Recipe:
    smithing_deploying(
        e,
        'create:clutch',
        'createmechanisms:redstone_mechanism',
        'create:andesite_casing',
        'create:shaft'
    )
    //Gearshift Recipe:
    smithing_deploying(
        e,
        'create:gearshift',
        'createmechanisms:redstone_mechanism',
        'create:andesite_casing',
        'create:cogwheel'
    )
    //Encased Chain Drive Recipe:
    smithing_deploying(
        e,
        'create:encased_chain_drive',
        'createmechanisms:wooden_mechanism',
        'create:andesite_casing',
        'minecraft:chain'
    )
    //Adjustable Chain Gearshift Recipe:
    smithing_deploying(
        e,
        'create:adjustable_chain_gearshift',
        'createmechanisms:redstone_mechanism',
        'create:encased_chain_drive',
        'create:electron_tube'
    )
    //Exchange dried kelp for rubber:
    ReplaceModInput(
        e,
        'create',
        'minecraft:dried_kelp',
        'createmechanisms:cured_rubber'
    )
    //Brass Dust:
    mixing(
        e,
        [
            itemOutput('alltheores:brass_dust')
        ],
        [
            itemInput('alltheores:zinc_dust'),
            itemInput('alltheores:zinc_dust'),
            itemInput('alltheores:zinc_dust'),
            itemInput('alltheores:zinc_dust'),
            itemInput('alltheores:copper_dust'),
            itemInput('alltheores:copper_dust'),
            itemInput('alltheores:copper_dust'),
            itemInput('alltheores:copper_dust')
        ],
        false
    )
    //Chain Conveior Recipe:
    smithing_deploying(
        e, 'create:chain_conveyor', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'create:large_cogwheel'
    )
    //Copper Backtank Recipe:
    smithing_deploying(
        e, 'create:copper_backtank', 'createmechanisms:fluid_mechanism', 'minecraft:copper_block', 'create:shaft'
    )
    //Netherte Backtank Recipe:
    smithing_deploying(
        e, 'create:netherite_backtank', 'createmechanisms:advanced_fluid_mechanism', 'create:copper_backtank', 'minecraft:netherite_ingot'
    )
    //Wrench-Create Recipe:
    shaped(
        e,
        itemOutput('create:wrench'),
        Object.assign(
            {},
            itemInputTagKey("A",'c:plates/gold'),
            itemInputKey("B", 'createmechanisms:wooden_mechanism'),
            itemInputTagKey("C", 'c:rods/wooden')
        ),
        [
            "AA",
            "AB",
            " C"
        ]
    )
    //Press Recipe:
    smithing_deploying(
        e, 'create:mechanical_press', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'minecraft:iron_block'
    )
    //Mixer Recipe:
    smithing_deploying(
        e, 'create:mechanical_mixer', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:whisk'
    )
    //Millstone Recipe:
    smithing_deploying(
        e, 'create:millstone', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'c:stones', true
    )
    //Fan Recipe:
    smithing_deploying(
        e, 'create:encased_fan', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:propeller'
    )
    //Crushing Wheel Recipe:
    mechanical_crafting(
        e,
        itemOutput('create:crushing_wheel'),
        Object.assign(
            {},
            itemInputKey("A", 'create:andesite_alloy'),
            itemInputTagKey("B",'minecraft:planks'),
            itemInputKey("C", 'createmechanisms:zinc_mechanism')
        ),
        [
            " AAA ",
            "AABAA",
            "ABCBA",
            "AABAA",
            " AAA "
        ]
    )
    //Empty Blaze Burner Recipe:
    smithing_deploying(
        e, 'create:empty_blaze_burner', 'createmechanisms:heat_mechanism', 'minecraft:netherrack', 'minecraft:iron_bars'
    )
    //Blaze Burner Recipe:
    deploying(
        e,
        itemOutput('create:blaze_burner'),
        itemInput('create:empty_blaze_burner'),
        itemInput('createmechanisms:advanced_heat_mechanism'),
        false
    )
    //Smart Chute Recipe:
    smithing_deploying(
        e, 'create:smart_chute', 'createmechanisms:zinc_mechanism', 'create:chute', 'create:electron_tube'
    )
    //Mechanical Pump Recipe:
    smithing_deploying(
        e, 'create:mechanical_pump', 'createmechanisms:fluid_mechanism', 'create:fluid_pipe', 'create:cogwheel'
    )
    //Smart Fluid Pipe Recipe:
    smithing_deploying(
        e, 'create:smart_fluid_pipe', 'createmechanisms:zinc_mechanism', 'create:fluid_pipe', 'create:electron_tube'
    )
    //Fluid Valve Recipe:
    smithing_deploying(
        e, 'create:fluid_valve', 'createmechanisms:rubber_mechanism', 'create:fluid_pipe', 'c:plates/iron', true
    )
    //Hose Pulley Recipe:
    sequenced_assembly(
        e,
        [
            itemOutput('create:hose_pulley')
        ],
        itemInput('create:copper_casing'),
        itemOutput('create:copper_casing'),
        1,
        [
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('create:shaft'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('create:fluid_pipe'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('createmechanisms:rubber_mechanism'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('createmechanisms:cured_rubber'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('createmechanisms:cured_rubber'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('createmechanisms:cured_rubber'), false),
            deployingS(itemOutput('create:copper_casing'), itemInput('create:copper_casing'), itemInput('createmechanisms:cured_rubber'), false)
        ]
    )
    //Fluid Tank Recipe:
    shaped(
        e,
        itemOutput('create:fluid_tank'),
        Object.assign(
            {},
            itemInputTagKey("A", 'c:plates/copper'),
            itemInputTagKey("B", 'c:glass_blocks'),
            itemInputKey("C", 'create:copper_casing')
        ),
        [
            " A ",
            "BCB",
            " A "
        ]
    )
    //Item Draim Recipe:
    smithing_deploying(
        e, 'create:item_drain', 'createmechanisms:rubber_mechanism', 'create:fluid_tank', 'minecraft:iron_bars'
    )
    //Spout Recipe:
    smithing_deploying(
        e, 'create:spout', 'createmechanisms:fluid_mechanism', 'create:fluid_tank', 'createmechanisms:cured_rubber'
    )
    //Portable Fluid Interface Recipe:
    portable_base_recipe(e, 'create:portable_fluid_interface', 'create:copper_casing')
    //Portable Item Interface Recipe:
    portable_base_recipe(e, 'create:portable_storage_interface', 'create:andesite_casing')
    //Seteam Engine Recipe:
    smithing_deploying(
        e, 'create:steam_engine', 'createmechanisms:heat_mechanism', 'minecraft:copper_block', 'createmechanisms:fluid_mechanism'
    )
    //Steam Whistle Recipe:
    smithing_deploying(
        e, 'create:steam_whistle', 'createmechanisms:low_heat_mechanism', 'create:fluid_pipe', 'c:plates/brass', true
    )
    //Mechanical Piston Recipe:
    smithing_deploying(
        e, 'create:mechanical_piston', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:piston_extension_pole'
    )
    //Gantry Carriage Recipe:
    smithing_deploying(
        e, 'create:gantry_carriage', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'create:cogwheel'
    )
    //Windmill Bearing Recipe:
    smithing_deploying(
        e, 'create:windmill_bearing', 'createmechanisms:zinc_mechanism', 'create:industrial_iron_block', 'minecraft:slime_ball'
    )
    //Clockwork Bearing Recipe:
    smithing_deploying(
        e, 'create:clockwork_bearing', 'createmechanisms:zinc_mechanism', 'create:brass_casing', 'minecraft:slime_ball'
    )
    //Mechanical Bearing Recipe:
    smithing_deploying(
        e, 'create:mechanical_bearing', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'minecraft:slime_ball'
    )
    //Rope Polley Recipe:
    smithing_deploying(
        e, 'create:rope_pulley', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'minecraft:wool', true
    )
    //Elevator Polley Recipe:
    smithing_deploying(
        e, 'create:elevator_pulley', 'create:precision_mechanism', 'create:brass_casing', 'createmechanisms:cured_rubber'
    )
    //Cart Assembler Recipe:
    smithing_deploying(
        e, 'create:cart_assembler', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'createmechanisms:redstone_mechanism'
    )
    //Sticker Recipe:
    smithing_deploying(
        e, 'create:sticker', 'createmechanisms:zinc_mechanism', 'minecraft:slime_block', 'create:industrial_iron_block'
    )
    //Contraption Controls Recipe:
    smithing_deploying(
        e, 'create:contraption_controls', 'createmechanisms:zinc_mechanism', 'create:andesite_casing', 'minecraft:buttons', true
    )
    //Drill Recipe:
    smithing_deploying(
        e, 'create:mechanical_drill', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:andesite_alloy'
    )
    //Deployer Recipe:
    smithing_deploying(
        e, 'create:deployer', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:brass_hand'
    )
    //Saw Recipe:
    smithing_deploying(
        e, 'create:mechanical_saw', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'c:plates/iron', true
    )
    //Redstone Contact Recipe:
    smithing_deploying(
        e, 'create:redstone_contact', 'createmechanisms:redstone_mechanism', 'create:industrial_iron_block', 'create:electron_tube'
    )
    //Harvester Recipe:
    smithing_deploying(
        e, 'create:mechanical_harvester', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'alltheores:invar_plate'
    )
    //Plough Recipe:
    smithing_deploying(
        e, 'create:mechanical_plough', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'alltheores:zinc_plate'
    )
    //Roller Recipe:
    smithing_deploying(
        e, 'create:mechanical_roller', 'createmechanisms:wooden_mechanism', 'create:andesite_casing', 'create:crushing_wheel'
    )
    //Mechanical Crafter Recipe:
    smithing_deploying(
        e, 'create:mechanical_crafter', 'minecraft:crafting_table', 'create:brass_casing', 'create:electron_tube'
    )
    //Sequenced Gearshift Recipe:
    smithing_deploying(
        e, 'create:sequenced_gearshift', 'create:cogwheel', 'create:brass_casing', 'create:electron_tube'
    )
    //Track Station Recipe:
    smithing_deploying(
        e, 'create:track_station', 'create:precision_mechanism', 'create:railway_casing', 'minecraft:compass'
    )
    //Track Signal Recipe:
    smithing_deploying(
        e, 'create:track_signal', 'create:precision_mechanism', 'create:railway_casing', 'create:electron_tube', false, 2
    )
    //Track Observer Recipe:
    smithing_deploying(
        e, 'create:track_observer', 'create:precision_mechanism', 'create:railway_casing', 'minecraft:wooden_pressure_plates', true
    )
    //Controls Recipe
    smithing_deploying(
        e, 'create:controls', 'create:precision_mechanism', 'create:railway_casing', 'minecraft:lever'
    )
    //Content Observer Recipe:
    smithing_deploying(
        e, 'create:content_observer', 'minecraft:observer', 'create:brass_casing', 'createmechanisms:zinc_mechanism'
    )
    //Stockpile Switch Recipe:
    smithing_deploying(
        e, 'create:stockpile_switch', 'minecraft:comparator', 'create:brass_casing', 'createmechanisms:zinc_mechanism'
    )
    //Packager Recipe:
    smithing_deploying(
        e, 'create:packager', 'createmechanisms:wooden_mechanism', 'create:cardboard_block', 'createmechanisms:redstone_mechanism'
    )
    //Package Frogport Recipe:
    smithing_deploying(
        e, 'create:package_frogport', 'createmechanisms:wooden_mechanism', 'create:item_vault', 'createmechanisms:cured_rubber'
    )
    //Stock Link Recipe:
    smithing_deploying(
        e, 'create:stock_link', 'createmechanisms:wooden_mechanism', 'create:item_vault', 'create:transmitter'
    )
    //Stock Ticker Recipe:
    smithing_deploying(
        e, 'create:stock_ticker', 'createmechanisms:zinc_mechanism', 'create:stock_link', 'c:glass_blocks', true
    )
    //Requester Recipe:
    smithing_deploying(
        e, 'create:redstone_requester', 'createmechanisms:zinc_mechanism', 'create:item_vault', 'create:stock_link'
    )
    //Factory Gauge Recipe:
    smithing_deploying(
        e, 'create:factory_gauge', 'create:precision_mechanism', 'create:stock_link', 'create:crafter_slot_cover'
    )
    //Display Link Recipe:
    smithing_deploying(
        e, 'create:display_link', 'createmechanisms:zinc_mechanism', 'create:brass_casing', 'create:transmitter'
    )
    //Display Board Recipe:
    smithing_deploying(
        e, 'create:display_board', 'createmechanisms:zinc_mechanism', 'create:andesite_alloy', 'create:electron_tube'
    )
    //Redstone Utils Recipe:
    tag_saw_converter_recipe(e, 'crafting:redstone_mechanism')
    //Filters Recipe:
    tag_saw_converter_recipe(e, 'crafting:filters')
    //Creative Blaze Cake Recipe:
    sequenced_assembly(
        e,
        [
            itemOutput('create:creative_blaze_cake')
        ],
        itemInput('createmechanisms:enderiam_heat_mechanism'),
        itemOutput('createmechanisms:enderiam_heat_mechanism'),
        100,
        [fillingS(itemOutput('createmechanisms:enderiam_heat_mechanism'), itemInput('createmechanisms:enderiam_heat_mechanism'), fluidInput('minecraft:lava', 1000))]
    )
    //Electron Tube Recipe:
    shaped(
        e,
        itemOutput('create:electron_tube'),
        Object.assign(
            {},
            itemInputKey("A", 'create:polished_rose_quartz'),
            itemInputKey("B", 'createmechanisms:redstone_mechanism'),
            itemInputTagKey("C", 'c:plates/iron')
        ),
        [
            "A",
            "B",
            "C"
        ]
    )
    //Transmiter Recipe:
    shaped(
        e,
        itemOutput('create:transmitter'),
        Object.assign(
            {},
            itemInputKey("A", 'create:electron_tube'),
            itemInputKey("B", 'createmechanisms:redstone_mechanism'),
            itemInputTagKey("C", 'c:dusts/redstone'),
            itemInputTagKey("D", 'c:plates/copper')
        ),
        [
            " A ",
            "DBD",
            " C "
        ]
    )
    //Transmiter Recipe:
    shaped(
        e,
        itemOutput('create:brown_toolbox'),
        Object.assign(
            {},
            itemInputKey("A", 'createmechanisms:wooden_mechanism'),
            itemInputTagKey("B", 'c:chests'),
            itemInputTagKey("C", 'c:leathers'),
            itemInputTagKey("D", 'c:plates/gold')
        ),
        [
            " A ",
            "DBD",
            " C "
        ]
    )
})