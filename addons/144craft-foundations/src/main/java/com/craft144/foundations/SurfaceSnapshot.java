package com.craft144.foundations;

import net.minecraft.core.BlockPos;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.chunk.ChunkAccess;
import net.minecraft.world.level.levelgen.Heightmap;

public final class SurfaceSnapshot {
    public final int[] firstAir = new int[256];
    public final boolean[] dry = new boolean[256];
    public final BlockState[] top = new BlockState[256];
    public final BlockState[] soil = new BlockState[256];

    SurfaceSnapshot() {}

    public SurfaceSnapshot(ChunkAccess chunk) {
        int minX = chunk.getPos().getMinBlockX();
        int minZ = chunk.getPos().getMinBlockZ();
        BlockPos.MutableBlockPos p = new BlockPos.MutableBlockPos();
        for (int z = 0; z < 16; z++) {
            for (int x = 0; x < 16; x++) {
                int i = z * 16 + x;
                int y = chunk.getHeight(Heightmap.Types.OCEAN_FLOOR_WG, x, z);
                firstAir[i] = y + 1;
                p.set(minX + x, y, minZ + z);
                top[i] = chunk.getBlockState(p);
                soil[i] = chunk.getBlockState(p.below(2));
                dry[i] = y > chunk.getMinBuildHeight()
                    && top[i].blocksMotion() && top[i].getFluidState().isEmpty()
                    && chunk.getBlockState(p.above()).getFluidState().isEmpty()
                    && !soil[i].isAir() && soil[i].getFluidState().isEmpty();
            }
        }
    }

    public interface Carrier {
        SurfaceSnapshot foundations$getSnapshot();
        void foundations$setSnapshot(SurfaceSnapshot snapshot);
    }
}
