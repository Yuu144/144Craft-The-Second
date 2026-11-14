ServerEvents.recipes(event => {
    event.remove({ id: 'justdirethings:upgrade_instabreak' })
    event.shaped('justdirethings:upgrade_instabreak', [
        'ABA',
        'CDE',
        'ABA'
    ], {
        A: 'justdirethings:time_crystal',
        B: 'minecraft:nether_star',
        C: 'industrialization_overdrive:vajra',
        D: 'justdirethings:upgrade_blank',
        E: 'mekanism:atomic_disassembler'
    }).id('144craft2:just_dire_things/minecraft/shaped/justdirethings/upgrade_instabreak')
})
