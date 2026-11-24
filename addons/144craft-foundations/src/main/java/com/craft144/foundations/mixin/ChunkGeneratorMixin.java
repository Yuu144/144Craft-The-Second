package com.craft144.foundations.mixin;

import com.craft144.foundations.FoundationGenerator;
import net.minecraft.world.level.StructureManager;
import net.minecraft.world.level.WorldGenLevel;
import net.minecraft.world.level.chunk.ChunkAccess;
import net.minecraft.world.level.chunk.ChunkGenerator;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(ChunkGenerator.class)
public abstract class ChunkGeneratorMixin {
    @Inject(method = "applyBiomeDecoration", at = @At("TAIL"))
    private void foundations$build(WorldGenLevel level, ChunkAccess chunk, StructureManager structures,
                                   CallbackInfo ci) {
        FoundationGenerator.build((ChunkGenerator) (Object) this, level, chunk, structures);
    }
}
