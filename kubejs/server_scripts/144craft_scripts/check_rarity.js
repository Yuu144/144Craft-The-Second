// Reports the Minecraft rarity of the item currently held in the main hand.
ServerEvents.commandRegistry(event => {
  var Commands = event.commands

  event.register(
    Commands.literal('check_rarity')
      .executes(ctx => {
        var player = ctx.source.playerOrException
        var stack = player.mainHandItem

        if (stack.isEmpty()) {
          player.tell('Hold an item first.')
          return 0
        }

        var rarity = stack.item.getRarity(stack).name()

        player.tell(`Item: ${stack.id}`)
        player.tell(`Minecraft rarity: ${rarity}`)
        return 1
      })
  )
})
