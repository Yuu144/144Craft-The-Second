package com.craft144.foundations;

import com.craft144.foundations.mixin.StructureTemplateAccessor;
import net.minecraft.core.BlockPos;
import net.minecraft.gametest.framework.GameTest;
import net.minecraft.gametest.framework.GameTestHelper;
import net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.chunk.ChunkAccess;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator;
import net.neoforged.neoforge.gametest.GameTestHolder;
import net.neoforged.neoforge.gametest.PrefixGameTestTemplate;

@GameTestHolder(Foundations.ID)
@PrefixGameTestTemplate(false)
public final class FoundationSmokeTests {
    @GameTest(template = "empty", timeoutTicks = 20)
    public static void mixinsAndConfigLoad(GameTestHelper helper) {
        helper.assertTrue(Foundations.active(), "Foundations must be active without SGI");
        Object chunk = helper.getLevel().getChunkAt(helper.absolutePos(BlockPos.ZERO));
        helper.assertTrue(chunk instanceof SurfaceSnapshot.Carrier, "Chunk snapshot mixin did not apply");
        Object template = new StructureTemplate();
        helper.assertTrue(template instanceof StructureTemplateAccessor, "Template accessor did not apply");
        helper.assertTrue(Foundations.excluded("dungeons_arise:heavenly_rider"), "Airship exclusion missing");
        helper.succeed();
    }

    @GameTest(template = "empty", timeoutTicks = 20)
    public static void addsBlocksWithoutRemovingSolidOrWater(GameTestHelper helper) {
        BlockPos first = helper.absolutePos(new BlockPos(1, 1, 1));
        ChunkAccess chunk = helper.getLevel().getChunkAt(first);
        SurfaceSnapshot snapshot = new SurfaceSnapshot();
        int index = (first.getZ() & 15) * 16 + (first.getX() & 15);
        int[] target = snapshot.firstAir.clone();
        snapshot.firstAir[index] = first.getY();
        snapshot.top[index] = Blocks.GRASS_BLOCK.defaultBlockState();
        snapshot.soil[index] = Blocks.DIRT.defaultBlockState();
        target[index] = first.getY() + 4;
        helper.setBlock(new BlockPos(1, 1, 1), Blocks.AIR);
        helper.setBlock(new BlockPos(1, 2, 1), Blocks.DIAMOND_BLOCK);
        helper.setBlock(new BlockPos(1, 3, 1), Blocks.WATER);
        helper.setBlock(new BlockPos(1, 4, 1), Blocks.AIR);
        FoundationGenerator.fillAirOnly(chunk, snapshot, target, Blocks.STONE.defaultBlockState());
        helper.assertBlockPresent(Blocks.DIRT, new BlockPos(1, 1, 1));
        helper.assertBlockPresent(Blocks.DIAMOND_BLOCK, new BlockPos(1, 2, 1));
        helper.assertBlockPresent(Blocks.WATER, new BlockPos(1, 3, 1));
        helper.assertBlockPresent(Blocks.GRASS_BLOCK, new BlockPos(1, 4, 1));
        helper.succeed();
    }

    @GameTest(template = "empty", timeoutTicks = 200)
    public static void noiseGenerationHooksLoad(GameTestHelper helper) {
        var nether = helper.getLevel().getServer().getLevel(Level.NETHER);
        helper.assertTrue(nether != null, "Test Nether missing");
        helper.assertTrue(nether.getChunkSource().getGenerator() instanceof NoiseBasedChunkGenerator,
            "Test must exercise a noise generator");
        Object chunk = nether.getChunk(0, 0);
        helper.assertTrue(chunk instanceof SurfaceSnapshot.Carrier, "Generated chunk lacks carrier");
        helper.assertTrue(((SurfaceSnapshot.Carrier) chunk).foundations$getSnapshot() == null,
            "Natural terrain snapshot was not released after generation");
        helper.succeed();
    }
}
