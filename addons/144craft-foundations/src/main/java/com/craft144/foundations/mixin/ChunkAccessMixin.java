package com.craft144.foundations.mixin;

import com.craft144.foundations.SurfaceSnapshot;
import net.minecraft.world.level.chunk.ChunkAccess;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Unique;

@Mixin(ChunkAccess.class)
public abstract class ChunkAccessMixin implements SurfaceSnapshot.Carrier {
    @Unique private SurfaceSnapshot foundations$snapshot;

    @Override public SurfaceSnapshot foundations$getSnapshot() { return foundations$snapshot; }
    @Override public void foundations$setSnapshot(SurfaceSnapshot value) { foundations$snapshot = value; }
}
