ServerEvents.recipes(event => {
    // Machines that use steam
    event.remove({ output: 'extended_industrialization:steel_alloy_smelter' })
    event.remove({ type: 'extended_industrialization:steel_alloy_smelter' })

    // Forge Hammer
    event.remove({ id: 'modern_industrialization:forge_hammer' })
    event.remove({ id: 'modern_industrialization:vanilla_recipes/steel_forge_hammer_asbl' })

    event.custom({
        type: 'create:compacting',
        ingredients: [
            { item: 'minecraft:diamond' },
            { item: 'minecraft:diamond' },
            { item: 'minecraft:diamond' },
            { item: 'minecraft:diamond' },
            { item: 'modern_industrialization:iron_large_plate' },
            { item: 'modern_industrialization:iron_large_plate' },
            { item: 'minecraft:iron_block' },
            { item: 'minecraft:iron_block' },
            { item: 'minecraft:iron_block' }
        ],
        results: [
            { id: 'modern_industrialization:forge_hammer', count: 1 }
        ]
    }).id('144craft2:modern_industrialization/create/compacting/modern_industrialization/forge_hammer')

    event.remove({ id: 'modern_industrialization:electric_age/component/implosion_compressor/singularity' })

    event.remove({ id: 'modern_industrialization:materials/coal/forge_hammer/ore_to_dust_with_tool' })
    event.custom({
        type: 'modern_industrialization:forge_hammer',
        damage: 50,
        ingredient: { tag: 'c:ores/coal' },
        result: { count: 4, id: 'minecraft:coal' }
    }).id('modern_industrialization:materials/coal/forge_hammer/ore_to_dust_with_tool')

    event.remove({ id: 'modern_industrialization:materials/coal/forge_hammer/crushed_dust_to_dust_with_tool' })
    event.custom({
        type: 'modern_industrialization:forge_hammer',
        count: 3,
        damage: 30,
        ingredient: { item: 'modern_industrialization:coal_crushed_dust' },
        result: { count: 4, id: 'minecraft:coal' }
    }).id('modern_industrialization:materials/coal/forge_hammer/crushed_dust_to_dust_with_tool')

    event.remove({ id: 'modern_industrialization:materials/coal/macerator/gem' })
    event.custom({
        type: 'modern_industrialization:macerator',
        duration: 100,
        eu: 2,
        item_inputs: [{ amount: 1, item: 'minecraft:coal' }],
        item_outputs: [{ amount: 4, item: 'minecraft:coal' }]
    }).id('modern_industrialization:materials/coal/macerator/gem')

    event.remove({ id: 'modern_industrialization:materials/coal/macerator/crushed_dust' })
    event.custom({
        type: 'modern_industrialization:macerator',
        duration: 50,
        eu: 2,
        item_inputs: [{ amount: 1, item: 'modern_industrialization:coal_crushed_dust' }],
        item_outputs: [{ amount: 4, item: 'minecraft:coal' }]
    }).id('modern_industrialization:materials/coal/macerator/crushed_dust')
    event.remove({ id: 'create:kjs/mekanism_dust_coal_mekanism_dust_coal' })

    event.custom({
        type: "create:crushing",
        ingredients: [
            {
                item: "minecraft:coal"
            }
        ],
        processing_time: 150,
        results: [
            {
                id: "mekanism:dust_coal"
            },
            {
                chance: 0.5,
                id: "mekanism:dust_coal"
            },
            {
                chance: 0.5,
                id: "modern_industrialization:carbon_dust"
            },
        ]
    }).id('144craft2:modern_industrialization/create/crushing/mekanism/dust_coal')

    // Bronze Ingot
    event.remove({ id: 'modern_industrialization:alloy/mixer/bronze/dust' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/bronze/tiny_dust' })
    event.remove({ id: 'modern_industrialization:materials/bronze_tiny_dust' })
    event.custom({
        "type": "create:crushing",
        "ingredients": [
            {
            "item": "minecraft:dripstone_block"
            }
        ],
        "results": [
            {
            "id": "modern_industrialization:manganese_dust"
            },
            {
            "id": "modern_industrialization:manganese_dust",
            "chance": 0.5
            }
        ]
    }).id('144craft2:create/crushing/dripstone_to_manganese_dust')

    event.custom({
        type: "mekanism:crushing",
        input: {
            count: 1,
            item: "minecraft:dripstone_block"
        },
        output: {
            count: 2,
            id: "modern_industrialization:manganese_dust"
        },
        per_tick_usage: false
    }).id('144craft2:mekanism/crushing/dripstone_to_manganese_dust')
    

    // Nano Items
    event.remove({ id: 'extended_industrializatio:nano_quantum_saber' })
    event.remove({ id: 'extended_industrializatio:nano_saber' })
    event.remove({ id: 'extended_industrializatio:nano_helmet' })
    event.remove({ id: 'extended_industrializatio:nano_chestplate' })
    event.remove({ id: 'extended_industrializatio:nano_leggings' })
    event.remove({ id: 'extended_industrializatio:nano_boots' })
    event.remove({ id: 'extended_industrializatio:nano_quantum_helmet' })
    event.remove({ id: 'extended_industrializatio:nano_quantum_chestplate' })
    event.remove({ id: 'extended_industrializatio:nano_quantum_leggings' })
    event.remove({ id: 'extended_industrializatio:nano_quantum_boots' })
})
