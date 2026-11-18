const standardizedPlateMaterials = ['aluminum', 'brass', 'bronze', 'constantan', 'copper', 'diamond', 'electrum', 'enderium', 'gold', 'invar', 'iridium', 'iron', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'steel', 'tin', 'uranium', 'zinc']
const restoredHammerPlateMaterials = ['bronze', 'copper', 'gold', 'iron', 'steel']
const nativeFlatPlateMaterials = ['aluminum', 'bronze', 'copper', 'diamond', 'electrum', 'gold', 'invar', 'iridium', 'iron', 'lead', 'nickel', 'platinum', 'silver', 'steel', 'tin']
const forgeBoltMaterials = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'uranium', 'zinc']
const curvedPlateOutputs = {
    aluminum: 'modern_industrialization:aluminum_curved_plate',
    brass: 'kubejs:brass_curved_plate',
    bronze: 'modern_industrialization:bronze_curved_plate',
    constantan: 'kubejs:constantan_curved_plate',
    copper: 'modern_industrialization:copper_curved_plate',
    diamond: 'kubejs:diamond_curved_plate',
    electrum: 'kubejs:electrum_curved_plate',
    enderium: 'kubejs:enderium_curved_plate',
    gold: 'modern_industrialization:gold_curved_plate',
    invar: 'kubejs:invar_curved_plate',
    iridium: 'modern_industrialization:iridium_curved_plate',
    iron: 'kubejs:iron_curved_plate',
    lead: 'kubejs:lead_curved_plate',
    lumium: 'kubejs:lumium_curved_plate',
    netherite: 'kubejs:netherite_curved_plate',
    nickel: 'kubejs:nickel_curved_plate',
    osmium: 'kubejs:osmium_curved_plate',
    platinum: 'kubejs:platinum_curved_plate',
    signalum: 'kubejs:signalum_curved_plate',
    silver: 'extended_industrialization:silver_curved_plate',
    steel: 'modern_industrialization:steel_curved_plate',
    tin: 'modern_industrialization:tin_curved_plate',
    uranium: 'kubejs:uranium_curved_plate',
    zinc: 'kubejs:zinc_curved_plate'
}

ServerEvents.recipes(event => {
    // Plates
    standardizedPlateMaterials.forEach(material => {
        const plate = 'alltheores:' + material + '_plate'
        const metal = (material === 'diamond' ? 'c:gems/' : 'c:ingots/') + material
        const path = '144craft2:plates/' + material + '/'
        const sources = [plate]
        if (nativeFlatPlateMaterials.includes(material)) {
            let nativePlate = 'modern_industrialization:' + material + '_plate'
            sources.push(nativePlate)
            event.remove({ id: 'modern_industrialization:materials/' + material + '/compressor/main' })
            event.shapeless(nativePlate, [plate]).id(path + 'mi_plate')
        }
        sources.forEach(output => {
            event.remove({ type: 'create:pressing', output: output })
            if (output.startsWith('modern_industrialization:') && restoredHammerPlateMaterials.includes(material)) {
                let forge = 'modern_industrialization:materials/' + material + '/forge_hammer/'
                event.remove({ id: forge + 'ingot_to_plate' })
                event.remove({ id: forge + 'double_ingot_to_plate' })
            } else {
                event.remove({ type: 'modern_industrialization:forge_hammer', output: output })
            }
        })
        event.remove({ type: 'modern_industrialization:compressor', output: plate })

        event.custom({
            type: 'create:pressing',
            ingredients: [{ tag: metal }],
            results: [{ id: plate, count: 1 }]
        }).id(path + 'pressing')
        addPlateMachineRecipe(event, 'modern_industrialization:compressor', metal, plate, 100, path + 'compressor')
        addToolHammerRecipe(event, metal, plate, 1, 20, path + 'forge_hammer')
    })

    // Bolts
    forgeBoltMaterials.forEach(material => {
        const output = 'kubejs:' + material + '_bolt'
        if (!Item.exists(output)) return
        const metal = (material === 'diamond' ? 'c:gems/' : 'c:ingots/') + material
        const path = '144craft2:forge_bolts/' + material + '/'
        addToolHammerRecipe(event, metal, output, 4, 60, path + 'metal')
        addToolHammerRecipe(event, 'c:rods/' + material, output, 2, 20, path + 'rod')
    })

    // Curved plates
    standardizedPlateMaterials.forEach(material => {
        const output = curvedPlateOutputs[material]
        if (!Item.exists(output)) return
        const plate = 'c:plates/' + material
        const path = '144craft2:curved_plates/' + material + '/'
        const bending = 'extended_industrialization:bending_machine'
        const compressor = 'modern_industrialization:compressor'
        ;[bending, compressor, 'modern_industrialization:forge_hammer'].forEach(type => {
            event.remove({ type: type, output: output })
        })
        addPlateMachineRecipe(event, bending, plate, output, 50, path + 'bending_machine')
        addPlateMachineRecipe(event, compressor, plate, output, 100, path + 'compressor')
        addToolHammerRecipe(event, plate, output, 1, 20, path + 'forge_hammer')
    })
})

ServerEvents.tags('item', event => {
    standardizedPlateMaterials.forEach(material => {
        const output = curvedPlateOutputs[material]
        if (Item.exists(output)) event.add('c:curved_plates/' + material, output)
    })
})

function addPlateMachineRecipe(event, type, tag, output, duration, id) {
    event.custom({
        type: type,
        duration: duration,
        eu: 2,
        item_inputs: [{ amount: 1, tag: tag }],
        item_outputs: [{ amount: 1, item: output }]
    }).id(id)
}

function addToolHammerRecipe(event, tag, output, count, damage, id) {
    event.custom({
        type: 'modern_industrialization:forge_hammer',
        damage: damage,
        ingredient: { tag: tag },
        result: { count: count, id: output }
    }).id(id)
}
