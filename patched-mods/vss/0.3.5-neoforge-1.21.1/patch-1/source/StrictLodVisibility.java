package dev.xantha.vss.compat;

import dev.xantha.vss.common.PositionUtil;
import dev.xantha.vss.common.VSSLogger;
import dev.xantha.vss.compat.StrictLodVisibility.1;
import dev.xantha.vss.compat.StrictLodVisibility.RenderWindow;
import dev.xantha.vss.compat.StrictLodVisibility.Snapshot;
import dev.xantha.vss.compat.StrictVoxyCoverageChanges.Delta;
import dev.xantha.vss.compat.StrictVoxyPipeline.Source;
import dev.xantha.vss.networking.client.StrictLodFrontier;
import dev.xantha.vss.networking.client.VSSClientNetworking;
import it.unimi.dsi.fastutil.ints.Int2IntMap;
import it.unimi.dsi.fastutil.ints.Int2IntMap.Entry;
import it.unimi.dsi.fastutil.longs.LongOpenHashSet;
import it.unimi.dsi.fastutil.objects.ObjectIterator;
import java.lang.reflect.Field;
import java.util.IdentityHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
import net.minecraft.client.Minecraft;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.level.Level;
import org.lwjgl.system.MemoryUtil;

public final class StrictLodVisibility {
   private static final StrictLodFrontier FRONTIER = new StrictLodFrontier();
   private static final StrictVoxyCoverageChanges COVERAGE = new StrictVoxyCoverageChanges();
   private static final StrictVoxyCoverageCache COLUMN_COVERAGE = new StrictVoxyCoverageCache();
   private static final StrictVoxyCoverageRegions REGION_COVERAGE = new StrictVoxyCoverageRegions();
   private static final StrictVoxyNodeIndex NODES = new StrictVoxyNodeIndex(COVERAGE::nodeChanged, COVERAGE::invalidateAll);
   private static volatile Snapshot snapshot = new Snapshot(null, 0, 0, -1, 0, 0L);
   private static volatile RenderWindow renderWindow = new RenderWindow(null, 0, 0, 0);
   private static Object levelIdentity;
   private static Object nodeOwner;
   private static ResourceKey<Level> dimension;
   private static boolean uploadedNodes;
   private static boolean failed;
   private static volatile boolean renderHookSeen;
   private static long revision;
   private static volatile String waiting = "initializing";
   private static final AtomicBoolean invalidated = new AtomicBoolean();
   private static final Map<Object, Integer> pendingIngest = new IdentityHashMap<>();
   private static volatile boolean ingestFailed;
   private static final AtomicLong changes = new AtomicLong();
   private static final Map<Object, Long> ingestColumns = new IdentityHashMap<>();
   private static final ConcurrentHashMap<Long, Integer> pendingColumns = new ConcurrentHashMap<>();
   private static volatile StrictVoxyPipeline meshPipeline;
   private static long checkedChange = -1L;
   private static long checkedFrontier = -1L;
   private static long frameChecks;
   private static long unchangedFrames;
   private static long coverageRetractions;
   private static final ClassValue<Map<String, Field>> FIELDS = new 1();

   public static void workChanged() {
      changes.incrementAndGet();
   }

   public static long meshPosition(Object task) {
      try {
         return ((Number)field(task, "position")).longValue();
      } catch (ReflectiveOperationException var2) {
         throw new IllegalStateException("Unsupported Voxy mesh task", var2);
      }
   }

   public static void beginIngest(Object section, int cx, int cz) {
      synchronized (pendingIngest) {
         long column = PositionUtil.packPosition(cx, cz);
         ingestColumns.put(section, column);
         pendingColumns.merge(column, 1, Integer::sum);
         beginIngest(section);
      }
   }

   public static void beginIngest(Object section) {
      synchronized (pendingIngest) {
         pendingIngest.merge(section, 1, Integer::sum);
      }

      workChanged();
   }

   public static void cancelIngest(Object section) {
      synchronized (pendingIngest) {
         Integer count = pendingIngest.get(section);
         if (count == null) {
            return;
         }

         Long column = ingestColumns.get(section);
         if (column != null) {
            pendingColumns.computeIfPresent(column, (key, value) -> value == 1 ? null : value - 1);
            if (count == 1) {
               ingestColumns.remove(section);
            }
         }

         if (count == 1) {
            pendingIngest.remove(section);
         } else {
            pendingIngest.put(section, count - 1);
         }
      }

      workChanged();
   }

   public static void ingestCompleted(Object task) {
      if (task != null) {
         try {
            cancelIngest(field(task, "section"));
         } catch (RuntimeException | ReflectiveOperationException var2) {
            ingestFailed = true;
            workChanged();
         }
      }
   }

   private StrictLodVisibility() {
   }

   public static boolean active() {
      return VSSClientNetworking.isPredictionActive() && VSSClientNetworking.shouldApplyStrictLodOrder() && (renderHookSeen || ModCompat.isVoxyLoaded());
   }

   public static Snapshot snapshot() {
      return snapshot;
   }

   public static long revision() {
      return snapshot.revision();
   }

   public static long coverageRevision() {
      return COVERAGE.revision();
   }

   public static long coverageResetRevision() {
      return COVERAGE.resetRevision();
   }

   public static Delta coverageChangesSince(long previous) {
      return COVERAGE.since(previous);
   }

   public static void updateRenderWindow(ResourceKey<Level> dim, double cameraX, double cameraZ, int radiusChunks) {
      if (dim == null || radiusChunks <= 2 || !Double.isFinite(cameraX) || !Double.isFinite(cameraZ)) {
         dim = null;
         cameraZ = 0.0;
         cameraX = 0.0;
         radiusChunks = 0;
      }

      int x = (int)Math.floor(cameraX / 16.0);
      int z = (int)Math.floor(cameraZ / 16.0);
      int radius = Math.max(0, radiusChunks - 2);
      RenderWindow old = renderWindow;
      if (old.dimension() != dim || old.x() != x || old.z() != z || old.radius() != radius) {
         renderWindow = new RenderWindow(dim, x, z, radius);
         if (dim != null && old.dimension() == dim && old.radius() == radius) {
            COVERAGE.windowMoved(old.x(), old.z(), x, z, radius);
         } else {
            COVERAGE.invalidateAll();
         }

         workChanged();
      }
   }

   public static boolean predictionCoverage(ResourceKey<Level> dim, int chunkX, int minBlockY, int maxBlockY, int chunkZ) {
      if (dim != null
         && dimension != null
         && dim.equals(dimension)
         && (renderHookSeen || ModCompat.isVoxyLoaded())
         && uploadedNodes
         && !failed
         && meshPipeline != null
         && renderWindow.contains(dim, chunkX, chunkZ)) {
         int minSectionY = Math.floorDiv(Math.min(minBlockY, maxBlockY), 16);
         int maxSectionY = Math.floorDiv(Math.max(minBlockY, maxBlockY), 16);
         return COLUMN_COVERAGE.covers(
            chunkX, minSectionY, maxSectionY, chunkZ, COVERAGE.columnRevision(chunkX, chunkZ), StrictLodVisibility::uncachedPredictionCoverage
         );
      } else {
         return false;
      }
   }

   private static boolean uncachedPredictionCoverage(int chunkX, int minSectionY, int maxSectionY, int chunkZ) {
      return NODES.coversRange(chunkX, minSectionY, maxSectionY, chunkZ);
   }

   public static boolean predictionCoverageBox(ResourceKey<Level> dim, int minX, int minBlockY, int minZ, int maxX, int maxBlockY, int maxZ) {
      if (minX > maxX || minZ > maxZ || !predictionReady(dim) || !renderWindow.containsBox(dim, minX, minZ, maxX, maxZ)) {
         return false;
      } else if (minX == maxX && minZ == maxZ) {
         return predictionCoverage(dim, minX, minBlockY, maxBlockY, minZ);
      } else {
         int minY = Math.floorDiv(Math.min(minBlockY, maxBlockY), 16);
         int maxY = Math.floorDiv(Math.max(minBlockY, maxBlockY), 16);
         return REGION_COVERAGE.covers(
            minX, minY, minZ, maxX, maxY, maxZ, COVERAGE.regionRevision(minX, minZ, maxX, maxZ), StrictLodVisibility::uncachedPredictionCoverageBox
         );
      }
   }

   private static boolean uncachedPredictionCoverageBox(int minX, int minY, int minZ, int maxX, int maxY, int maxZ) {
      return NODES.coversBox(minX, minY, minZ, maxX, maxY, maxZ);
   }

   public static boolean predictionMayCover(ResourceKey<Level> dim, int minX, int minZ, int maxX, int maxZ) {
      return minX <= maxX && minZ <= maxZ && predictionReady(dim) && renderWindow.intersects(dim, minX, minZ, maxX, maxZ);
   }

   private static boolean predictionReady(ResourceKey<Level> dim) {
      return dim != null
         && dimension != null
         && dim.equals(dimension)
         && (renderHookSeen || ModCompat.isVoxyLoaded())
         && uploadedNodes
         && !failed
         && meshPipeline != null;
   }

   public static void invalidate() {
      invalidated.set(true);
      workChanged();
   }

   public static synchronized void restartOrdering(ResourceKey<Level> dim, int cx, int cz) {
      snapshot = new Snapshot(dim, cx, cz, -1, 0, ++revision);
      invalidated.set(true);
      workChanged();
   }

   public static String diagnostics() {
      Snapshot s = snapshot;
      return "{active="
         + active()
         + ",voxyVisibility=unrestricted,readyRing="
         + s.visibleRing()
         + ",requestRing="
         + s.requestRing()
         + ",waiting="
         + waiting
         + ",checks="
         + frameChecks
         + ",unchangedFrames="
         + unchangedFrames
         + ",coverageRetractions="
         + coverageRetractions
         + ",meshPending="
         + (meshPipeline == null ? -1 : meshPipeline.size())
         + ",handoffRevision="
         + COVERAGE.revision()
         + ",coverageQueries={"
         + COLUMN_COVERAGE.diagnostics()
         + "},coverageRegions={"
         + REGION_COVERAGE.diagnostics()
         + "},nodeBoxLookups="
         + NODES.boxLookups()
         + ",handoffRadius="
         + renderWindow.radius()
         + ",bridgeFailed="
         + failed
         + ",predictionHandoff=region-index+frame-depth}";
   }

   public static boolean completed(ResourceKey<Level> dim, int cx, int cz) {
      if (!active()) {
         return true;
      } else {
         Snapshot s = snapshot;
         return dim != null && dim.equals(s.dimension()) && s.visible(cx, cz);
      }
   }

   public static void reset() {
      resetGeometry();
      synchronized (pendingIngest) {
         pendingIngest.clear();
         ingestColumns.clear();
         pendingColumns.clear();
      }

      ingestFailed = false;
   }

   private static void resetGeometry() {
      FRONTIER.reset();
      NODES.clear();
      nodeOwner = null;
      levelIdentity = null;
      dimension = null;
      uploadedNodes = false;
      failed = false;
      renderWindow = new RenderWindow(null, 0, 0, 0);
      meshPipeline = null;
      checkedChange = -1L;
      checkedFrontier = -1L;
      workChanged();
      publish();
   }

   public static void beginFrame(Object renderSystem, Object viewport) {
      renderHookSeen = true;
      Minecraft mc = Minecraft.getInstance();
      if (mc == null || mc.level == null || mc.player == null) {
         resetGeometry();
      } else if (!active()) {
         if (levelIdentity != null) {
            resetGeometry();
         }
      } else {
         FRONTIER.center(mc.player.getBlockX() >> 4, mc.player.getBlockZ() >> 4, VSSClientNetworking.getEffectiveLodDistanceChunks());
         if (invalidated.getAndSet(false)) {
            FRONTIER.reset();
            FRONTIER.center(mc.player.getBlockX() >> 4, mc.player.getBlockZ() >> 4, VSSClientNetworking.getEffectiveLodDistanceChunks());
         }

         try {
            if (viewport == null || ((Number)field(viewport, "width")).intValue() <= 0 || ((Number)field(viewport, "height")).intValue() <= 0) {
               return;
            }

            Object owner = field(renderSystem, "nodeManager");
            boolean preloadedOwner = levelIdentity == null && nodeOwner == owner;
            if (levelIdentity != mc.level) {
               if (!preloadedOwner) {
                  resetGeometry();
               }

               levelIdentity = mc.level;
               dimension = mc.level.dimension();
               COVERAGE.invalidateAll();
            }

            if (nodeOwner != owner) {
               FRONTIER.reset();
               NODES.clear();
               uploadedNodes = false;
               nodeOwner = owner;
               meshPipeline = null;
               failed = false;
               workChanged();
               FRONTIER.center(mc.player.getBlockX() >> 4, mc.player.getBlockZ() >> 4, VSSClientNetworking.getEffectiveLodDistanceChunks());
            }

            updateRenderWindow(
               dimension,
               ((Number)field(viewport, "cameraX")).doubleValue(),
               ((Number)field(viewport, "cameraZ")).doubleValue(),
               ModCompat.getVoxyViewDistanceChunks().orElse(0)
            );
            if (!active() || failed) {
               return;
            }

            if (meshPipeline == null) {
               if (!(field(renderSystem, "renderGen") instanceof Source source)) {
                  throw new IllegalStateException("Missing scoped mesh completion hook");
               }

               meshPipeline = source.vss$pipeline();
               COVERAGE.invalidateAll();
            }

            long change = changes.get();
            if (checkedChange == change && checkedFrontier == FRONTIER.revision()) {
               unchangedFrames++;
               publish();
               return;
            }

            checkedChange = change;
            checkedFrontier = FRONTIER.revision();
            frameChecks++;
            waiting = !failed && !ingestFailed ? "gpu-snapshot" : "unsupported";
            if (!failed && !ingestFailed && uploadedNodes) {
               waiting = "distance-limit";
               boolean advanced = FRONTIER.advance(
                  (x, z) -> {
                     boolean ready = VSSClientNetworking.strictColumnReady(x, z);
                     if (!ready) {
                        waiting = "data@" + x + "," + z;
                     }

                     return ready;
                  },
                  (x, z) -> {
                     boolean ready = !pendingColumns.containsKey(PositionUtil.packPosition(x, z))
                        && VSSClientNetworking.strictColumnRenderReady(x, z, y -> meshPipeline.idle(x, y, z) && NODES.coversFinest(x, y, z));
                     if (!ready) {
                        waiting = "gpu@" + x + "," + z;
                     }

                     return ready;
                  }
               );
               if (advanced) {
                  waiting = "advanced";
               }
            }
         } catch (RuntimeException | ReflectiveOperationException var8) {
            failClosed(var8);
         }

         publish();
      }
   }

   public static void uploaded(Object owner, Object result) {
      if (owner != null && result != null && !failed) {
         if (nodeOwner == null) {
            nodeOwner = owner;
         }

         if (owner == nodeOwner) {
            try {
               Int2IntMap locations = (Int2IntMap)field(result, "scatterWriteLocationMap");
               Object buffer = field(result, "scatterWriteBuffer");
               long address = ((Number)field(buffer, "address")).longValue();
               long size = ((Number)field(buffer, "size")).longValue();
               LongOpenHashSet removedPositions = new LongOpenHashSet();
               ObjectIterator before = locations.int2IntEntrySet().iterator();

               while (before.hasNext()) {
                  Entry e = (Entry)before.next();
                  if (e.getIntKey() >= 0) {
                     long offset = (long)e.getIntValue() * 16L;
                     if (offset < 0L || offset + 16L > size) {
                        throw new IllegalStateException("Voxy node metadata outside buffer");
                     }

                     long ptr = address + offset;
                     long key = (long)MemoryUtil.memGetInt(ptr) << 32 | Integer.toUnsignedLong(MemoryUtil.memGetInt(ptr + 4L));
                     long removed = NODES.update(e.getIntKey(), key, MemoryUtil.memGetInt(ptr + 8L));
                     if (removed != Long.MIN_VALUE) {
                        removedPositions.add(removed);
                     }
                  }
               }

               int beforex = FRONTIER.visibleRing();
               if (active()) {
                  NODES.retractUncovered(
                     FRONTIER, removedPositions, (x, z) -> VSSClientNetworking.strictColumnRenderReady(x, z, y -> NODES.coversFinest(x, y, z))
                  );
               }

               if (FRONTIER.visibleRing() < beforex) {
                  coverageRetractions++;
               }

               boolean wasUploaded = uploadedNodes;
               uploadedNodes = true;
               if (!wasUploaded) {
                  COVERAGE.invalidateAll();
               }

               if (!locations.isEmpty() || !wasUploaded) {
                  workChanged();
               }

               publish();
            } catch (RuntimeException | ReflectiveOperationException var19) {
               failClosed(var19);
               publish();
            }
         }
      }
   }

   private static Object field(Object object, String name) throws ReflectiveOperationException {
      if (object == null) {
         throw new IllegalStateException("Missing Voxy object: " + name);
      } else {
         Field field = FIELDS.get(object.getClass()).get(name);
         if (field == null) {
            throw new NoSuchFieldException(name);
         } else {
            return field.get(object);
         }
      }
   }

   private static void failClosed(Exception failure) {
      if (!failed) {
         VSSLogger.warn("Prediction handoff disabled until Voxy renderer reset: unreadable uploaded boundary", failure);
         failed = true;
         uploadedNodes = false;
         NODES.clear();
         FRONTIER.reset();
         waiting = "unsupported";
         workChanged();
      }
   }

   private static synchronized void publish() {
      Snapshot old = snapshot;
      int visible = failed ? -1 : FRONTIER.visibleRing();
      if (old.dimension() != dimension
         || old.x() != FRONTIER.centerX()
         || old.z() != FRONTIER.centerZ()
         || old.visibleRing() != visible
         || old.requestRing() != FRONTIER.requestRing()) {
         revision++;
         snapshot = new Snapshot(dimension, FRONTIER.centerX(), FRONTIER.centerZ(), visible, FRONTIER.requestRing(), revision);
      }
   }
}
