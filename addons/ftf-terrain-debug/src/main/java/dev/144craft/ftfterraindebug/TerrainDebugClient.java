package dev.craft144.ftfterraindebug;

import java.util.UUID;

import net.minecraft.client.Minecraft;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.client.event.ClientPlayerNetworkEvent;
import net.neoforged.neoforge.client.event.CustomizeGuiOverlayEvent;

@EventBusSubscriber(modid = TerrainDebugMod.MOD_ID, value = Dist.CLIENT)
public final class TerrainDebugClient {
    private static UUID playerId;
    private static String dimension = "";
    private static int x;
    private static int z;
    private static String terrain = "";

    private TerrainDebugClient() {}

    public static void accept(TerrainPayload payload) {
        playerId = payload.playerId();
        dimension = payload.dimension();
        x = payload.x();
        z = payload.z();
        terrain = payload.terrain();
    }

    @SubscribeEvent
    public static void onDebugText(CustomizeGuiOverlayEvent.DebugText event) {
        Minecraft minecraft = Minecraft.getInstance();
        if (minecraft.player == null || terrain.isBlank()
                || !minecraft.player.getUUID().equals(playerId)
                || !minecraft.player.level().dimension().location().toString().equals(dimension)
                || Math.abs(minecraft.player.blockPosition().getX() - x) > 16
                || Math.abs(minecraft.player.blockPosition().getZ() - z) > 16) {
            return;
        }
        event.getLeft().add("Terrain: " + terrain);
    }

    @SubscribeEvent
    public static void onLogout(ClientPlayerNetworkEvent.LoggingOut event) {
        playerId = null;
        dimension = "";
        terrain = "";
    }
}
