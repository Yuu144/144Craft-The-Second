package com.craft144.foundations.mixin;

import com.craft144.foundations.Foundations;
import com.craft144.foundations.SurfaceSnapshot;
import net.minecraft.server.level.WorldGenRegion;
import net.minecraft.world.level.StructureManager;
import net.minecraft.world.level.biome.BiomeManager;
import net.minecraft.world.level.chunk.ChunkAccess;
import net.minecraft.world.level.levelgen.GenerationStep;
import net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator;
import net.minecraft.world.level.levelgen.RandomState;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(NoiseBasedChunkGenerator.class)
public abstract class NoiseBasedChunkGeneratorMixin {
    @Inject(method = "applyCarvers", at = @At("TAIL"))
    private void foundations$capture(WorldGenRegion region, long seed, RandomState random,
                                     BiomeManager biomes, StructureManager structures, ChunkAccess chunk,
                                     GenerationStep.Carving step, CallbackInfo ci) {
        if (Foundations.active()) {
            ((SurfaceSnapshot.Carrier) chunk).foundations$setSnapshot(new SurfaceSnapshot(chunk));
        }
    }
}
