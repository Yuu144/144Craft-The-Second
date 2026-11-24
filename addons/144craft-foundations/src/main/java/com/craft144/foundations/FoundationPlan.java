package com.craft144.foundations;

import java.util.HashMap;
import java.util.Map;
import java.util.function.IntBinaryOperator;

/** Pure, coordinate-based calculation. No world writes or random numbers. */
public final class FoundationPlan {
    public record Column(int x, int z) {}
    public enum Kind { UNDERGROUND, SUPPORTED, SURFACE_GAP, TOO_HIGH }
    private final Map<Column, Integer> bottoms = new HashMap<>();
    private final Map<Column, Integer> placedBottoms = new HashMap<>();

    public void addBottom(int x, int z, int y) {
        bottoms.merge(new Column(x, z), y, Math::min);
    }

    public void addTemplateColumn(int x, int z, Integer solidY, int placedY) {
        placedBottoms.merge(new Column(x, z), placedY, Math::min);
        if (solidY != null) addBottom(x, z, solidY);
    }

    public static Kind classify(int solidY, int placedY, int ground, int maxRise) {
        if (solidY < ground || placedY < ground - 3) return Kind.UNDERGROUND;
        if (solidY == ground) return Kind.SUPPORTED;
        return solidY - ground <= maxRise ? Kind.SURFACE_GAP : Kind.TOO_HIGH;
    }

    public int[] heights(int minX, int minZ, int[] original, boolean[] dry,
                         int maxRise, int skirt, IntBinaryOperator naturalGround,
                         IntBinaryOperator naturalSurface) {
        if (original.length != 256 || dry.length != 256 || maxRise < 1 || skirt < 0) {
            throw new IllegalArgumentException("Invalid foundation parameters");
        }
        int[] result = original.clone();
        for (var entry : bottoms.entrySet()) {
            Column source = entry.getKey();
            int bottom = entry.getValue();
            int ground = naturalGround.applyAsInt(source.x, source.z);
            if (naturalSurface.applyAsInt(source.x, source.z) != ground
                || classify(bottom, placedBottoms.getOrDefault(source, bottom), ground, maxRise)
                    != Kind.SURFACE_GAP) {
                continue;
            }
            int x0 = Math.max(minX, source.x - skirt);
            int x1 = Math.min(minX + 15, source.x + skirt);
            int z0 = Math.max(minZ, source.z - skirt);
            int z1 = Math.min(minZ + 15, source.z + skirt);
            for (int z = z0; z <= z1; z++) {
                for (int x = x0; x <= x1; x++) {
                    int index = (z - minZ) * 16 + x - minX;
                    if (!dry[index]) continue;
                    double distance = Math.hypot(x - source.x, z - source.z);
                    if (distance > skirt) continue;
                    double t = skirt == 0 ? 1.0 : Math.max(0, 1.0 - distance / skirt);
                    double weight = t * t * (3.0 - 2.0 * t);
                    int rise = (int) Math.floor(Math.max(0, bottom - original[index]) * weight);
                    result[index] = Math.max(result[index], original[index] + Math.min(maxRise, rise));
                }
            }
        }
        // A skirt must not fill an adjacent room, basement, or template-only air column.
        for (int z = 0; z < 16; z++) {
            for (int x = 0; x < 16; x++) {
                int index = z * 16 + x;
                Column column = new Column(minX + x, minZ + z);
                Integer bottom = bottoms.get(column);
                if (bottom == null) {
                    if (placedBottoms.containsKey(column)) result[index] = original[index];
                    continue;
                }
                int ground = naturalGround.applyAsInt(column.x, column.z);
                Kind kind = classify(bottom, placedBottoms.getOrDefault(column, bottom), ground, maxRise);
                result[index] = kind == Kind.SURFACE_GAP
                    ? Math.max(original[index], Math.min(result[index], bottom))
                    : original[index];
            }
        }
        return result;
    }
}
