package com.craft144.foundations;

import com.craft144.foundations.mixin.PoolElementPieceAccessor;
import com.craft144.foundations.mixin.SinglePoolElementInvoker;
import com.craft144.foundations.mixin.StructureTemplateAccessor;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.WeakHashMap;
import net.minecraft.core.BlockPos;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.WorldGenRegion;
import net.minecraft.tags.BlockTags;
import net.minecraft.world.level.StructureManager;
import net.minecraft.world.level.WorldGenLevel;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.Mirror;
import net.minecraft.world.level.block.Rotation;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.chunk.ChunkAccess;
import net.minecraft.world.level.chunk.ChunkGenerator;
import net.minecraft.world.level.chunk.status.ChunkStatus;
import net.minecraft.world.level.levelgen.GenerationStep;
import net.minecraft.world.level.levelgen.Heightmap;
import net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator;
import net.minecraft.world.level.levelgen.RandomState;
import net.minecraft.world.level.levelgen.structure.PoolElementStructurePiece;
import net.minecraft.world.level.levelgen.structure.StructurePiece;
import net.minecraft.world.level.levelgen.structure.StructureStart;
import net.minecraft.world.level.levelgen.structure.TemplateStructurePiece;
import net.minecraft.world.level.levelgen.structure.pools.SinglePoolElement;
import net.minecraft.world.level.levelgen.structure.pools.StructureTemplatePool;
import net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings;
import net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate;

public final class FoundationGenerator {
    private record TemplateColumn(int x, int z, Integer solidY, int placedY) {}
    private static final Map<StructureTemplate, List<TemplateColumn>> PROFILES =
        Collections.synchronizedMap(new WeakHashMap<>());

    private FoundationGenerator() {}

    public static void build(ChunkGenerator generator, WorldGenLevel level,
                             ChunkAccess chunk, StructureManager structures) {
        SurfaceSnapshot.Carrier carrier = (SurfaceSnapshot.Carrier) chunk;
        SurfaceSnapshot snapshot = carrier.foundations$getSnapshot();
        carrier.foundations$setSnapshot(null);
        if (snapshot == null || !Foundations.active()
            || !(generator instanceof NoiseBasedChunkGenerator noise)
            || !(level instanceof WorldGenRegion region)) {
            return;
        }
        int skirt = Foundations.SKIRT.get();
        int minX = chunk.getPos().getMinBlockX();
        int minZ = chunk.getPos().getMinBlockZ();
        FoundationPlan plan = new FoundationPlan();
        Set<StructureStart> starts = new HashSet<>();
        // Do not load chunks, generate neighbours, or depend on their block contents.
        for (int dz = -8; dz <= 8; dz++) {
            for (int dx = -8; dx <= 8; dx++) {
                ChunkAccess neighbour = region.getChunk(chunk.getPos().x + dx, chunk.getPos().z + dz,
                    ChunkStatus.STRUCTURE_STARTS, false);
                if (neighbour != null) starts.addAll(neighbour.getAllStarts().values());
            }
        }
        for (StructureStart start : starts) {
            if (!start.isValid()) continue;
            ResourceLocation id = level.registryAccess().registryOrThrow(Registries.STRUCTURE)
                .getKey(start.getStructure());
            if (id == null || Foundations.excluded(id.toString())) continue;
            GenerationStep.Decoration step = start.getStructure().step();
            if (step != GenerationStep.Decoration.SURFACE_STRUCTURES
                && step != GenerationStep.Decoration.LOCAL_MODIFICATIONS
                && step != GenerationStep.Decoration.FLUID_SPRINGS
                && !Foundations.MIXED.get().contains(id.toString())) continue;
            var box = start.getBoundingBox();
            if (box.maxX() < minX - skirt || box.minX() > minX + 15 + skirt
                || box.maxZ() < minZ - skirt || box.minZ() > minZ + 15 + skirt) continue;

            // Keep the complete skirt within the guaranteed eight-chunk start horizon.
            int safeMinX = start.getChunkPos().getMinBlockX() - 128 + skirt;
            int safeMinZ = start.getChunkPos().getMinBlockZ() - 128 + skirt;
            int safeMaxX = start.getChunkPos().getMinBlockX() + 143 - skirt;
            int safeMaxZ = start.getChunkPos().getMinBlockZ() + 143 - skirt;
            for (StructurePiece piece : start.getPieces()) {
                addPiece(plan, piece, minX - skirt, minZ - skirt,
                    minX + 15 + skirt, minZ + 15 + skirt,
                    safeMinX, safeMinZ, safeMaxX, safeMaxZ);
            }
        }
        RandomState random = region.getLevel().getChunkSource().randomState();
        Map<FoundationPlan.Column, Integer> grounds = new HashMap<>();
        Map<FoundationPlan.Column, Integer> surfaces = new HashMap<>();
        int[] target = plan.heights(minX, minZ, snapshot.firstAir, snapshot.dry,
            Foundations.MAX_RISE.get(), skirt,
            (x, z) -> grounds.computeIfAbsent(new FoundationPlan.Column(x, z),
                c -> generator.getBaseHeight(x, z, Heightmap.Types.OCEAN_FLOOR_WG, chunk, random)),
            (x, z) -> surfaces.computeIfAbsent(new FoundationPlan.Column(x, z),
                c -> generator.getBaseHeight(x, z, Heightmap.Types.WORLD_SURFACE_WG, chunk, random)));
        BlockState stone = noise.generatorSettings().value().defaultBlock();
        fillAirOnly(chunk, snapshot, target, stone);
    }

    static void fillAirOnly(ChunkAccess chunk, SurfaceSnapshot snapshot, int[] target, BlockState stone) {
        int minX = chunk.getPos().getMinBlockX();
        int minZ = chunk.getPos().getMinBlockZ();
        BlockPos.MutableBlockPos pos = new BlockPos.MutableBlockPos();
        for (int z = 0; z < 16; z++) {
            for (int x = 0; x < 16; x++) {
                int i = z * 16 + x;
                for (int y = snapshot.firstAir[i]; y < Math.min(target[i], chunk.getMaxBuildHeight()); y++) {
                    pos.set(minX + x, y, minZ + z);
                    if (!chunk.getBlockState(pos).isAir()) continue;
                    int depth = target[i] - 1 - y;
                    BlockState fill = depth == 0 ? snapshot.top[i] : depth < 4 ? snapshot.soil[i] : stone;
                    chunk.setBlockState(pos, fill, false);
                }
            }
        }
    }

    private static void addPiece(FoundationPlan plan, StructurePiece piece,
                                  int minX, int minZ, int maxX, int maxZ,
                                  int safeMinX, int safeMinZ, int safeMaxX, int safeMaxZ) {
        var box = piece.getBoundingBox();
        if (box.maxX() < minX || box.minX() > maxX || box.maxZ() < minZ || box.minZ() > maxZ) return;
        StructureTemplate template;
        BlockPos origin;
        Mirror mirror;
        Rotation rotation;
        BlockPos pivot;
        if (piece instanceof PoolElementStructurePiece pool) {
            if (pool.getElement().getProjection() != StructureTemplatePool.Projection.RIGID
                || !(pool.getElement() instanceof SinglePoolElement single)) return;
            template = ((SinglePoolElementInvoker) single).foundations$template(
                ((PoolElementPieceAccessor) pool).foundations$templateManager());
            origin = pool.getPosition();
            mirror = Mirror.NONE;
            rotation = pool.getRotation();
            pivot = BlockPos.ZERO;
        } else if (piece instanceof TemplateStructurePiece templated) {
            template = templated.template();
            origin = templated.templatePosition();
            StructurePlaceSettings settings = templated.placeSettings();
            mirror = settings.getMirror();
            rotation = settings.getRotation();
            pivot = settings.getRotationPivot();
        } else {
            // Unknown procedural pieces are not guessed from a whole-building bounding box.
            return;
        }
        for (TemplateColumn column : profile(template)) {
            BlockPos local = new BlockPos(column.x, column.placedY, column.z);
            BlockPos p = StructureTemplate.transform(local, mirror, rotation, pivot).offset(origin);
            if (p.getX() >= minX && p.getX() <= maxX && p.getZ() >= minZ && p.getZ() <= maxZ
                && p.getX() >= safeMinX && p.getX() <= safeMaxX
                && p.getZ() >= safeMinZ && p.getZ() <= safeMaxZ) {
                plan.addTemplateColumn(p.getX(), p.getZ(),
                    column.solidY == null ? null : origin.getY() + column.solidY, p.getY());
            }
        }
    }

    private static List<TemplateColumn> profile(StructureTemplate template) {
        return PROFILES.computeIfAbsent(template, t -> {
            Map<FoundationPlan.Column, Integer> lowest = new HashMap<>();
            Map<FoundationPlan.Column, Integer> placed = new HashMap<>();
            for (StructureTemplate.Palette palette : ((StructureTemplateAccessor) t).foundations$palettes()) {
                for (StructureTemplate.StructureBlockInfo block : palette.blocks()) {
                    BlockState state = block.state();
                    BlockPos p = block.pos();
                    FoundationPlan.Column column = new FoundationPlan.Column(p.getX(), p.getZ());
                    if (!state.is(Blocks.STRUCTURE_VOID)) placed.merge(column, p.getY(), Math::min);
                    if (!state.blocksMotion() || !state.getFluidState().isEmpty()
                        || state.is(BlockTags.LEAVES) || state.is(Blocks.STRUCTURE_BLOCK)
                        || state.is(Blocks.JIGSAW) || state.is(Blocks.STRUCTURE_VOID)) continue;
                    lowest.merge(column, p.getY(), Math::min);
                }
            }
            List<TemplateColumn> result = new ArrayList<>(placed.size());
            placed.forEach((column, y) ->
                result.add(new TemplateColumn(column.x(), column.z(), lowest.get(column), y)));
            return List.copyOf(result);
        });
    }
}
