public class VisibilityHarness {
    static final Frontier FRONTIER = new Frontier();
    static Object levelIdentity;
    static boolean enabled;
    static int resets, centers, reads, passed, windowUpdates;

    public static class Level {}
    public static class Player {
        public int getBlockX() { return 0; }
        public int getBlockZ() { return 0; }
    }
    public static class Game {
        static final Game instance = new Game();
        public Level level = new Level();
        public Player player = new Player();
        public static Game getInstance() { return instance; }
    }
    public static class Frontier {
        public void center(int x, int z, int distance) { centers++; }
        public void reset() {}
    }
    public static class Network {
        public static int getEffectiveLodDistanceChunks() { return 128; }
    }
    static final java.util.concurrent.atomic.AtomicBoolean invalidated =
        new java.util.concurrent.atomic.AtomicBoolean();
    static boolean renderHookSeen;
    static boolean active() { return enabled && renderHookSeen; }
    static void resetGeometry() { resets++; levelIdentity = null; }
    static Object field(Object viewport, String name) {
        reads++;
        int[] size = (int[]) viewport;
        return name.equals("width") ? size[0] : size[1];
    }
    static void beginFrame(Object system, Object viewport) { throw new AssertionError("not transformed"); }
    static void clear() {
        resets = centers = reads = passed = windowUpdates = 0;
        levelIdentity = null;
        enabled = false;
        renderHookSeen = false;
        invalidated.set(false);
        Game.instance.level = new Level();
        Game.instance.player = new Player();
    }
    static void require(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }
    public static void main(String[] args) {
        clear();
        beginFrame(null, new int[]{1920,1080});
        beginFrame(null, new int[]{1920,1080});
        require(centers == 0 && reads == 0 && resets == 0 && passed == 0,
                "inactive frames must skip visibility work");
        levelIdentity = new Object();
        beginFrame(null, new int[]{1920,1080});
        beginFrame(null, new int[]{1920,1080});
        require(resets == 1, "disable transition must clean up only once");
        clear(); enabled = true;
        beginFrame(null, null);
        require(windowUpdates == 0 && reads == 0 && passed == 0,
                "null shadow viewport must preserve the render window");
        beginFrame(null, new int[]{0,1080});
        beginFrame(null, new int[]{1920,0});
        require(windowUpdates == 0 && passed == 0,
                "zero-sized viewport must preserve the render window");
        beginFrame(null, new int[]{1920,1080});
        require(passed == 1, "valid active viewport must reach the original geometry path");
        enabled = false;
        Game.instance.level = null;
        beginFrame(null, null);
        require(resets == 1, "missing world must still clean up before the inactive guard");
        Game.instance.level = new Level();
        Game.instance.player = null;
        beginFrame(null, null);
        require(resets == 2, "missing player must still clean up");
        System.out.println("PASS: inactive frames, disable cleanup, null/zero viewport, active view, world/player cleanup.");
    }
}
