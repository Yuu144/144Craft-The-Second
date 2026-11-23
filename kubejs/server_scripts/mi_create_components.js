ServerEvents.recipes(event => {
    const item = id => ({ item: id })
    const tag = id => ({ tag: id })
    const sequence = (id, base, incomplete, ingredients, press) => {
        event.remove({ id: 'modern_industrialization:' + id })
        const steps = ingredients.map(ingredient => ({
            type: 'create:deploying',
            ingredients: [item(incomplete), ingredient],
            results: [{ id: incomplete }]
        }))
        if (press) {
            steps.push({
                type: 'create:pressing',
                ingredients: [item(incomplete)],
                results: [{ id: incomplete }]
            })
        }
        return { steps: steps, base: base, incomplete: incomplete }
    }
    const add = (id, output, base, incomplete, ingredients, loops, press) => {
        const recipe = sequence(id, base, incomplete, ingredients, press)
        event.custom({
            type: 'create:sequenced_assembly',
            ingredient: recipe.base,
            transitional_item: { id: recipe.incomplete },
            loops: loops,
            sequence: recipe.steps,
            results: [{ id: 'modern_industrialization:' + output }]
        }).id('144craft2:mi_create_components/' + output)
    }

    // Motor
    add('electric_age/component/craft/motor_asbl', 'motor',
        item('modern_industrialization:steel_rod_magnetic'),
        'modern_industrialization:steel_rod_magnetic', [
            tag('c:rods/steel'),
            item('modern_industrialization:tin_cable'),
            item('modern_industrialization:copper_wire'), item('modern_industrialization:copper_wire')
        ], 2, true)

    // Robot Arm
    add('electric_age/component/craft/robot_arm_asbl', 'robot_arm',
        item('modern_industrialization:analog_circuit'), 'modern_industrialization:analog_circuit', [
            tag('c:rods/steel'),
            item('modern_industrialization:motor'),
            item('modern_industrialization:tin_cable'), item('modern_industrialization:tin_cable'),
            item('modern_industrialization:piston')
        ], 2, false)

    // Basic Machine Hull
    add('electric_age/hull/lv_machine_hull_asbl', 'basic_machine_hull',
        item('modern_industrialization:analog_circuit'),
        'modern_industrialization:analog_circuit', [
            item('modern_industrialization:steel_machine_casing'),
            item('modern_industrialization:tin_cable'), item('modern_industrialization:tin_cable'),
            item('modern_industrialization:redstone_battery')
        ], 2, true)
})
