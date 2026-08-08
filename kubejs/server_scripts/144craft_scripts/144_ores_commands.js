ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('give_144_ores')
      .requires(source => source.hasPermission(2))
      .executes(ctx => {
        const player = ctx.source.playerOrException
        player.give('kubejs:144_ium_ore')
        player.give('kubejs:13_ium_ore')
        return 1
      })
  )
})
