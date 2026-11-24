package com.craft144.foundations;

import java.util.Arrays;
import java.util.Random;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FoundationPlanTest {
    private static int[] flat(int height) {
        int[] heights = new int[256];
        Arrays.fill(heights, height);
        return heights;
    }
    private static boolean[] dry() {
        boolean[] dry = new boolean[256];
        Arrays.fill(dry, true);
        return dry;
    }
    private static int[] run(FoundationPlan plan, int x, int z, int[] original, int skirt) {
        return plan.heights(x, z, original, dry(), 12, skirt, (a, b) -> 64, (a, b) -> 64);
    }
    @Test void raisesUnsupportedBase() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 69);
        int[] result = run(plan, 0, 0, flat(64), 6);
        assertEquals(69, result[8 * 16 + 8]);
        assertTrue(result[8 * 16 + 10] > 64);
        assertEquals(64, result[8 * 16 + 14]);
    }
    @Test void neverCutsHigherTerrain() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 69);
        assertArrayEquals(flat(80), run(plan, 0, 0, flat(80), 6));
    }
    @Test void basementWinsOverUpperFloorInSameColumn() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 69);
        plan.addBottom(8, 8, 40);
        assertArrayEquals(flat(64), run(plan, 0, 0, flat(64), 6));
    }
    @Test void skipsFlyingAndBuriedBases() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(2, 2, 200);
        plan.addBottom(12, 12, 40);
        assertArrayEquals(flat(64), run(plan, 0, 0, flat(64), 6));
    }
    @Test void skipsWaterAtSupportAndDestination() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 69);
        assertArrayEquals(flat(64), plan.heights(0, 0, flat(64), dry(), 12, 6,
            (x, z) -> 60, (x, z) -> 64));
        assertArrayEquals(flat(64), plan.heights(0, 0, flat(64), new boolean[256], 12, 6,
            (x, z) -> 64, (x, z) -> 64));
    }
    @Test void orderDoesNotChangeResults() {
        FoundationPlan a = new FoundationPlan();
        FoundationPlan b = new FoundationPlan();
        Random random = new Random(144);
        int[][] supports = new int[100][3];
        for (int[] s : supports) {
            s[0] = random.nextInt(32) - 8;
            s[1] = random.nextInt(32) - 8;
            s[2] = 64 + random.nextInt(12);
            a.addBottom(s[0], s[1], s[2]);
        }
        for (int i = supports.length - 1; i >= 0; i--) {
            int[] s = supports[i];
            b.addBottom(s[0], s[1], s[2]);
        }
        assertArrayEquals(run(a, 0, 0, flat(64), 6), run(b, 0, 0, flat(64), 6));
    }
    @Test void chunkBordersAndNegativeCoordinatesUseWorldPositions() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(0, 0, 72);
        int[] nw = run(plan, -16, -16, flat(64), 6);
        int[] ne = run(plan, 0, -16, flat(64), 6);
        int[] sw = run(plan, -16, 0, flat(64), 6);
        assertEquals(nw[255], ne[15 * 16 + 1]);
        assertEquals(nw[255], sw[16 + 15]);
        assertTrue(nw[255] > 64);
    }
    @Test void zeroSkirtOnlyFillsSupportColumn() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 69);
        int[] result = run(plan, 0, 0, flat(64), 0);
        assertEquals(1, Arrays.stream(result).filter(y -> y > 64).count());
    }
    @Test void noStructuresChangesNothingAndDoesNotMutateSnapshot() {
        int[] original = flat(64);
        int[] copy = original.clone();
        assertArrayEquals(copy, run(new FoundationPlan(), 0, 0, original, 6));
        assertArrayEquals(copy, original);
    }
    @Test void skirtCannotFillNeighbouringBasement() {
        FoundationPlan plan = new FoundationPlan();
        plan.addBottom(8, 8, 72);
        plan.addBottom(9, 8, 40);
        int[] result = run(plan, 0, 0, flat(64), 6);
        assertEquals(72, result[8 * 16 + 8]);
        assertEquals(64, result[8 * 16 + 9]);
    }
    @Test void buriedAirRoomWithCeilingIsNotMistakenForFloatingFloor() {
        FoundationPlan plan = new FoundationPlan();
        plan.addTemplateColumn(8, 8, 72, 40);
        plan.addBottom(9, 8, 72);
        int[] result = run(plan, 0, 0, flat(64), 6);
        assertEquals(64, result[8 * 16 + 8]);
        assertEquals(72, result[8 * 16 + 9]);
        assertEquals(FoundationPlan.Kind.UNDERGROUND, FoundationPlan.classify(72, 40, 64, 12));
    }
    @Test void airOnlyTemplateColumnIsProtectedFromSkirts() {
        FoundationPlan plan = new FoundationPlan();
        plan.addTemplateColumn(8, 8, null, 60);
        plan.addBottom(9, 8, 72);
        assertEquals(64, run(plan, 0, 0, flat(64), 6)[8 * 16 + 8]);
    }
    @Test void surfaceStiltsAndDeepBasementsAreClassifiedPerColumn() {
        assertEquals(FoundationPlan.Kind.SURFACE_GAP, FoundationPlan.classify(69, 62, 64, 12));
        assertEquals(FoundationPlan.Kind.UNDERGROUND, FoundationPlan.classify(40, 40, 64, 12));
        assertEquals(FoundationPlan.Kind.SUPPORTED, FoundationPlan.classify(64, 64, 64, 12));
        assertEquals(FoundationPlan.Kind.TOO_HIGH, FoundationPlan.classify(200, 200, 64, 12));
    }
}
