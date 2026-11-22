package dev.craft144.ftfterraindebug;

import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;
import net.neoforged.neoforge.network.event.RegisterPayloadHandlersEvent;

@Mod(TerrainDebugMod.MOD_ID)
public final class TerrainDebugMod {
    public static final String MOD_ID = "ftfterraindebug";

    public TerrainDebugMod(IEventBus modBus) {
        modBus.addListener(this::registerPayloads);
    }

    private void registerPayloads(RegisterPayloadHandlersEvent event) {
        event.registrar("1").playToClient(TerrainPayload.TYPE, TerrainPayload.STREAM_CODEC, TerrainPayload::handle);
    }
}
