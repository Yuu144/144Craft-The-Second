ServerEvents.recipes(event => {

    event.remove({ output: 'storagedrawers:upgrade_template' })
    event.remove({ output: 'storagedrawers:copper_storage_upgrade' })
    event.remove({ output: 'storagedrawers:iron_storage_upgrade' })
    event.remove({ output: 'storagedrawers:gold_storage_upgrade' })
    event.remove({ output: 'storagedrawers:diamond_storage_upgrade' })
    event.remove({ output: 'storagedrawers:emerald_storage_upgrade' })
    event.remove({ output: 'storagedrawers:netherite_storage_upgrade' })


    event.shaped('storagedrawers:upgrade_template', [
        'AAA',
        'BCB',
        'AAA'
    ], {
        A: '#minecraft:planks',
        B: 'create:andesite_alloy',
        C: 'createmechanisms:wooden_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/upgrade_template')

    event.shaped('storagedrawers:copper_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'minecraft:iron_block',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/copper_storage_upgrade')

    event.shaped('storagedrawers:iron_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'alltheores:steel_block',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/iron_storage_upgrade')

    event.shaped('storagedrawers:gold_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'minecraft:diamond_block',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/gold_storage_upgrade')

    event.shaped('storagedrawers:emerald_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'alltheores:constantan_block',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/emerald_storage_upgrade')

    event.shaped('storagedrawers:diamond_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'draconicevolution:draconium_block',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/diamond_storage_upgrade')

    event.shaped('storagedrawers:netherite_storage_upgrade', [
        'AAA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:planks',
        B: 'mekanism:block_refined_obsidian',
        C: 'storagedrawers:upgrade_template',
        D: 'create:precision_mechanism'
    }).id('144craft2:storage_drawers/minecraft/shaped/storagedrawers/netherite_storage_upgrade')

})