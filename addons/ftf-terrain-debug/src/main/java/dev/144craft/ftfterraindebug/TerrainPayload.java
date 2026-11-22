package dev.craft144.ftfterraindebug;

import java.util.UUID;

import net.minecraft.network.RegistryFriendlyByteBuf;
import net.minecraft.network.codec.StreamCodec;
import net.minecraft.network.protocol.common.custom.CustomPacketPayload;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.network.codec.ByteBufCodecs;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.fml.loading.FMLEnvironment;
import net.neoforged.neoforge.network.handling.IPayloadContext;

public record TerrainPayload(UUID playerId, String dimension, int x, int z, String terrain)
        implements CustomPacketPayload {
    public static final Type<TerrainPayload> TYPE =
            new Type<>(ResourceLocation.fromNamespaceAndPath(TerrainDebugMod.MOD_ID, "terrain"));

    public static final StreamCodec<RegistryFriendlyByteBuf, TerrainPayload> STREAM_CODEC = StreamCodec.composite(
            ByteBufCodecs.STRING_UTF8, payload -> payload.playerId().toString(),
            ByteBufCodecs.STRING_UTF8, TerrainPayload::dimension,
            ByteBufCodecs.VAR_INT, TerrainPayload::x,
            ByteBufCodecs.VAR_INT, TerrainPayload::z,
            ByteBufCodecs.STRING_UTF8, TerrainPayload::terrain,
            (id, dimension, x, z, terrain) -> new TerrainPayload(UUID.fromString(id), dimension, x, z, terrain));

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }

    public static void handle(TerrainPayload payload, IPayloadContext context) {
        if (FMLEnvironment.dist == Dist.CLIENT) {
            TerrainDebugClient.accept(payload);
        }
    }
}
