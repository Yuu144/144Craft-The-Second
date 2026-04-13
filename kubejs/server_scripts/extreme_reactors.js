ServerEvents.recipes(event => {

    event.remove({ output: 'bigreactors:graphite_ingot' })
    event.remove({ output: 'bigreactors:reprocessorcontroller' })

    event.custom({
        type: 'create:mixing',
        ingredients: [
            { item: 'minecraft:coal_block' }
        ],
        results: [
            {
                "amount": 250,
                "id": "kubejs:ctl"
            }
        ]
    }).heated()

    event.custom({
        type: 'dndesires:hydraulic_compacting',
        ingredients: [
            { 
                "type": "neoforge:single",
                "amount": 125,
                "fluid": "kubejs:ctl"
            }
        ],
        results: [
            { id: 'bigreactors:graphite_ingot', count: 4 }
        ]
    })

    event.shaped('bigreactors:reprocessorcontroller', [
        'AEA',
        'BDB',
        'ACA'
    ], {
        A: 'bigreactors:reprocessorcasing',
        B: 'bigreactors:cyanite_ingot',
        C: 'create:precision_mechanism',
        D: 'create:railway_casing',
        E: 'minecraft:comparator'
    })

})