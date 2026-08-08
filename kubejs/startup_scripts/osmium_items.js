StartupEvents.registry('item', event => {
    event.create('acid_treated_osmium')
        .displayName('Acid-Treated Osmium')
        .tooltip('§7Raw crushed osmium ore dissolved in sulfuric acid.')

    event.create('osmium_tetroxide_dust')
        .displayName('Osmium Tetroxide Powder')
        .tooltip('§7A highly volatile and toxic oxidized osmium compound. Handle with care.')

    event.create('purified_osmium_dust')
        .displayName('Purified Osmium Dust')
        .tooltip('§7Pure osmium powder ready for smelting.')
})
