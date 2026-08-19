// Circuit Assembler blocks, casing, recipe type, and multiblock registration.

let CIRCUIT_ASSEMBLER;

StartupEvents.registry('block', event => {
  const createAssemblerBlock = (id, name, texture) => {
    event.create(id)
      .displayName(name)
      .texture(`kubejs:block/${texture}`)
      .stoneSoundType()
      .hardness(3.0)
      .resistance(6.0)
      .requiresTool(true)
      .tagBlock('minecraft:mineable/pickaxe')
      .item(item => item.displayName(name))
  }

  createAssemblerBlock(
    'circuit_assembler_frame',
    'Circuit Assembler Frame',
    'circuit_assembler_frame'
  )
  createAssemblerBlock(
    'circuit_assembler_terminal',
    'Circuit Assembler Terminal',
    'circuit_assembler_terminal'
  )
  createAssemblerBlock(
    'circuit_assembler_coil',
    'Circuit Assembler Coil',
    'circuit_assembler_coil'
  )
  createAssemblerBlock(
    'circuit_assembler_casing',
    'Circuit Assembler Casing',
    'circuit_assembler_casing'
  )
})

MIMachineEvents.registerRecipeTypes(event => {
  CIRCUIT_ASSEMBLER = event.register('circuit_assembler')
    .withItemInputs()
    .withItemOutputs()
    .withFluidInputs()
})

MIMachineEvents.registerCasings(event => {
  event.registerBlockImitation(
    'circuit_assembler_casing',
    'kubejs:circuit_assembler_casing'
  )
})

MIMachineEvents.registerMachines(event => {
  const assemblerHatch = event.hatchOf(
    'item_input',
    'item_output',
    'fluid_input',
    'energy_input'
  )

  const customMachineShape = event.layeredShape('circuit_assembler_casing', [
    [' aaa ', ' bcb ', ' ddd ', ' ddd ', ' ddd ', ' bcb ', ' aaa '],
    ['aaaaa', 'b   b', 'd   d', 'd   d', 'd   d', 'b   b', 'aaaaa'],
    ['aaaaa', 'c   c', 'd   d', 'd   d', 'd   d', 'c   c', 'aaaaa'],
    ['aaaaa', 'b   b', 'd   d', 'd   d', 'd   d', 'b   b', 'aaaaa'],
    [' aaa ', ' bcb ', ' ddd ', ' d#d ', ' ddd ', ' bcb ', ' aaa '],
  ])
    .key('a', event.memberOfBlock('kubejs:circuit_assembler_frame'), assemblerHatch)
    .key('b', event.memberOfBlock('kubejs:circuit_assembler_terminal'), event.noHatch())
    .key('c', event.memberOfBlock('kubejs:circuit_assembler_coil'), event.noHatch())
    .key('d', event.memberOfBlock('kubejs:circuit_assembler_casing'), event.noHatch())
    .build()

  event.simpleElectricCraftingMultiBlock(
    'Circuit Assembler',
    'circuit_assembler',
    CIRCUIT_ASSEMBLER,
    customMachineShape,
    event.progressBar(77, 33, 'arrow'),
    itemInputs => itemInputs.addSlots(56, 35, 2, 1),
    itemOutputs => itemOutputs.addSlot(102, 35),
    fluidInputs => fluidInputs.addSlot(36, 35),
    fluidOutputs => {},
    'circuit_assembler_casing',
    'assembler',
    true,
    false,
    false
  )
})
