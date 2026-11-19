ServerEvents.recipes(event => {
    // Solar Generator
    event.remove({ output: 'mekanismgenerators:solar_generator' })
    event.shaped('mekanismgenerators:solar_generator', [
        'SSS', 'APA', 'OEO'
    ], {
        S: 'mekanismgenerators:solar_panel',
        A: '#mekanism:alloys/infused',
        P: 'oritech:plastic_sheet',
        O: '#c:ingots/osmium',
        E: 'mekanism:energy_tablet'
    }).id('144craft2:renewable/solar_generator')

    // Solar Panels
    const panels = [
        { tier: 'lv', rod: 'tin', circuit: 'analog_circuit', hull: 'basic_machine_hull', motor: 'motor', cable: 'tin_cable' },
        { tier: 'mv', rod: 'aluminum', circuit: 'electronic_circuit', hull: 'advanced_machine_hull', motor: 'large_motor', cable: 'electrum_cable' },
        { tier: 'hv', rod: 'stainless_steel', circuit: 'digital_circuit', hull: 'turbo_machine_hull', motor: 'advanced_motor', cable: 'aluminum_cable' }
    ]
    panels.forEach(panel => {
        const output = `extended_industrialization:${panel.tier}_solar_panel`
        event.remove({ output: output })
        event.shaped(output, ['PCP', 'FHF', 'cMc'], {
            C: `modern_industrialization:${panel.circuit}`,
            P: 'oritech:plastic_sheet',
            F: '#modern_industrialization:fluid_pipes',
            H: `modern_industrialization:${panel.hull}`,
            c: `modern_industrialization:${panel.cable}`,
            M: `modern_industrialization:${panel.motor}`
        }).id(`144craft2:renewable/${panel.tier}_solar_panel`)
        event.custom({
            type: 'modern_industrialization:assembler',
            duration: 200,
            eu: 8,
            item_inputs: [
                { item: 'oritech:plastic_sheet', amount: 2 },
                { item: `modern_industrialization:${panel.circuit}`, amount: 1 },
                { item: `modern_industrialization:${panel.cable}`, amount: 2 },
                { tag: 'modern_industrialization:fluid_pipes', amount: 2 },
                { item: `modern_industrialization:${panel.hull}`, amount: 1 },
                { item: `modern_industrialization:${panel.motor}`, amount: 1 }
            ],
            item_outputs: [{ item: output, amount: 1 }]
        }).id(`144craft2:renewable/${panel.tier}_solar_panel_assembler`)
    })

    // Big Solar Panel
    event.remove({ output: 'oritech:big_solar_panel_block' })
    event.shaped('oritech:big_solar_panel_block', ['FPF', 'FCF', 'SBS'], {
        F: 'oritech:fluxite', P: 'oritech:plastic_sheet',
        C: 'oritech:advanced_battery', S: 'oritech:flux_gate',
        B: 'oritech:basic_generator_block'
    }).id('144craft2:renewable/big_solar_panel')

    // Solar Panel
    event.remove({ output: 'ad_astra:solar_panel' })
    event.shaped('ad_astra:solar_panel', ['CCC', 'SDS', 'DPD'], {
        C: 'ad_astra:photovoltaic_etrium_cell',
        S: '#ad_astra:steel_plates', D: '#ad_astra:desh_plates',
        P: 'oritech:plastic_sheet'
    }).id('144craft2:renewable/ad_astra_solar_panel')
})
