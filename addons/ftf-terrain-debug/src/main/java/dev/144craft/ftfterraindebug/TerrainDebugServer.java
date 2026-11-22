package dev.craft144.ftfterraindebug;

import etcodehome.freeterraforged.world.worldgen.cell.Cell;
import etcodehome.freeterraforged.world.worldgen.runtime.TerraForgedChunkGenerator;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.level.chunk.ChunkGenerator;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.event.tick.PlayerTickEvent;
import net.neoforged.neoforge.network.PacketDistributor;

@EventBusSubscriber(modid = TerrainDebugMod.MOD_ID)
public final class TerrainDebugServer {
    private TerrainDebugServer() {}

    @SubscribeEvent
    public static void onPlayerTick(PlayerTickEvent.Post event) {
        if (!(event.getEntity() instanceof ServerPlayer player) || player.tickCount % 10 != 0) {
            return;
        }

        ChunkGenerator generator = player.serverLevel().getChunkSource().getGenerator();
        if (!(generator instanceof TerraForgedChunkGenerator terraForged)) {
            PacketDistributor.sendToPlayer(player, new TerrainPayload(
                    player.getUUID(), player.serverLevel().dimension().location().toString(),
                    player.blockPosition().getX(), player.blockPosition().getZ(), ""));
            return;
        }

        var context = terraForged.generatorContext().orElse(null);
        if (context == null || context.lookup == null) {
            return;
        }

        int x = player.blockPosition().getX();
        int z = player.blockPosition().getZ();
        Cell cell = context.lookup.lookup(x, z);
        String terrain = cell.terrain == null ? "" : cell.terrain.getName();
        PacketDistributor.sendToPlayer(player, new TerrainPayload(
                player.getUUID(), player.serverLevel().dimension().location().toString(), x, z, terrain));
    }
}
