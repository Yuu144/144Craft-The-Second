package com.vivideru.sgi.diagnostics;

import java.lang.reflect.*;
import java.nio.file.*;
import java.io.*;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

/** Read-only observation. Never requests chunks or asks StructureManager to resolve starts. */
public final class SgiDiagnostics {
    private static final AtomicLong SEQUENCE = new AtomicLong();
    private static final ThreadLocal<String> CONTEXT = new ThreadLocal<>();
    private static final Path FILE = Path.of("logs", "sgi-diagnostics.log");
    private static final long LIMIT = 16L * 1024 * 1024;
    private static BufferedWriter writer;
    private static long bytes;
    private static boolean warned;

    public static void eventResult(Object result, String phase, String method, Object owner, Object[] args) {
        event(phase, method, owner, args, result);
    }

    public static void event(String phase, String method, Object owner, Object[] args, Object result) {
        if (Boolean.getBoolean("sgi.diagnostics.disabled")) return;
        try {
            boolean sample = method.endsWith(".fillColumn");
            if (sample) {
                int i = (Integer) args[0];
                if (phase.equals("ENTER") || (i != 136 && i >= 16 && i < 240 && i % 16 != 0 && i % 16 != 15)) return;
            }
            String chunk = null;
            for (Object arg : args) {
                if (arg != null && hasMethod(arg, "getAllReferences")) {
                    chunk = brief(call(arg, "getPos"));
                    break;
                }
            }
            if (chunk != null) CONTEXT.set(chunk);
            StringBuilder text = new StringBuilder(Instant.now().toString())
                .append(" pid=").append(ProcessHandle.current().pid())
                .append(" seq=").append(SEQUENCE.incrementAndGet())
                .append(" thread=").append(Thread.currentThread().getName())
                .append(" chunk=").append(sample ? "from-world-xz-args1-2" : CONTEXT.get())
                .append(' ').append(phase).append(' ').append(method);
            if (sample) {
                int index = (Integer) args[0];
                for (String key : new String[]{"surface", "strength", "bottom", "carveFloor", "crustFloor", "canyonOpen", "surfaceDrop"}) {
                    Object array = field(owner, key);
                    text.append(' ').append(key).append('=')
                        .append(array != null && array.getClass().isArray() ? Array.get(array, index) : array);
                }
            } else if (owner != null && owner.getClass().getName().startsWith("com.vivideru.sgi.worldgen.TerrainShaper")) {
                text.append(" owner=").append(describe(owner, 0));
            }
            for (int i = 0; i < args.length; i++) {
                text.append(" arg").append(i).append('=').append(describe(args[i], 0));
            }
            if (!phase.equals("ENTER")) text.append(" result=").append(describe(result, 0));
            write(text.toString());
            if (!phase.equals("ENTER") && (method.endsWith(".expandReferencesImpl") || method.endsWith(".shaperForImpl"))) {
                CONTEXT.remove();
            }
        } catch (Throwable failure) {
            if (!warned) {
                warned = true;
                System.err.println("[SGI-DIAG] Logging failed (terrain code continues): " + failure);
            }
        }
    }

    private static String describe(Object o, int depth) {
        if (o == null) return "null";
        String name = o.getClass().getName();
        if (depth > 2) return brief(o);
        if (hasMethod(o, "getAllReferences")) {
            return brief(o) + "{pos=" + brief(call(o, "getPos"))
                + ",status=" + brief(call(o, "getPersistedStatus"))
                + ",refs=" + describe(call(o, "getAllReferences"), depth + 1)
                + ",rawStarts=" + describe(call(o, "getAllStarts"), depth + 1)
                + ",cachedNoise=" + describe(field(o, "noiseChunk"), depth + 1) + "}";
        }
        if (name.endsWith(".StructureStart")) {
            return brief(o) + "{valid=" + call(o, "isValid") + ",start=" + call(o, "getChunkPos")
                + ",box=" + call(o, "getBoundingBox") + ",structure=" + brief(call(o, "getStructure"))
                + ",pieces=" + describe(call(o, "getPieces"), depth + 1) + "}";
        }
        if (name.contains("StructureFilter$Plan")) {
            return brief(o) + "{verdict=" + call(o, "verdict") + ",id=" + call(o, "id")
                + ",anchor=" + call(o, "anchorY") + ",site=" + describe(call(o, "site"), depth + 1) + "}";
        }
        if (name.endsWith("TerrainShaper$Site")) {
            return brief(o) + "{id=" + field(o, "id") + ",window=[" + field(o, "winX0") + ","
                + field(o, "winZ0") + "," + field(o, "winX1") + "," + field(o, "winZ1")
                + "],outlines=" + describe(call(o, "outlines"), depth + 1) + "}";
        }
        if (name.endsWith("TerrainShaper$Outline")) {
            return brief(o) + "{" + call(o, "describe") + "}";
        }
        if (name.endsWith(".TerrainShaper")) {
            return brief(o) + "{outlines=" + describe(field(o, "outlines"), depth + 1) + "}";
        }
        if (name.endsWith("TerrainShaper$Function")) {
            return brief(o) + "{shaper=" + describe(field(o, "this$0"), depth + 1)
                + ",vanilla=" + brief(field(o, "vanilla")) + "}";
        }
        if (name.endsWith(".NoiseChunk")) {
            return brief(o) + "{beardifier=" + describe(field(o, "beardifier"), depth + 1) + "}";
        }
        if (name.endsWith(".CallbackInfoReturnable")) {
            return brief(o) + "{cancelled=" + call(o, "isCancelled")
                + ",return=" + describe(call(o, "getReturnValue"), depth + 1) + "}";
        }
        if (name.endsWith(".NoiseGeneratorSettings")) {
            return briefIdentity(o) + "{block=" + call(o, "defaultBlock")
                + ",fluid=" + call(o, "defaultFluid") + ",noise=" + call(o, "noiseSettings") + "}";
        }
        if (o instanceof Map<?, ?> map) {
            StringJoiner j = new StringJoiner(",", "{", "}");
            int n = 0;
            for (var entry : map.entrySet()) {
                if (++n > 64) { j.add("...total=" + map.size()); break; }
                j.add(entry.getKey() + "=" + describe(entry.getValue(), depth + 1));
            }
            return j.toString();
        }
        if (o instanceof Collection<?> list) {
            StringJoiner j = new StringJoiner(",", "[", "]");
            int n = 0;
            for (Object item : list) {
                if (++n > 64) { j.add("...total=" + list.size()); break; }
                j.add(describe(item, depth + 1));
            }
            return j.toString();
        }
        if (o instanceof Throwable t) return t.getClass().getName() + ":" + t.getMessage();
        return brief(o);
    }

    private static boolean hasMethod(Object o, String name) {
        try { o.getClass().getMethod(name); return true; }
        catch (ReflectiveOperationException e) { return false; }
    }
    private static Object call(Object o, String method) {
        try { return o.getClass().getMethod(method).invoke(o); }
        catch (ReflectiveOperationException e) { return "<unavailable:" + method + ">"; }
    }
    private static Object field(Object o, String name) {
        for (Class<?> c = o.getClass(); c != null; c = c.getSuperclass()) {
            try {
                Field f = c.getDeclaredField(name);
                f.setAccessible(true);
                return f.get(o);
            } catch (NoSuchFieldException ignored) {
            } catch (ReflectiveOperationException | RuntimeException e) {
                return "<unavailable:" + name + ">";
            }
        }
        return "<missing:" + name + ">";
    }
    private static String brief(Object o) {
        if (o == null) return "null";
        String value = String.valueOf(o).replace('\n', ' ').replace('\r', ' ');
        if (value.length() > 1500) value = value.substring(0, 1500) + "...";
        return o.getClass().getSimpleName() + "#" + Integer.toHexString(System.identityHashCode(o)) + ":" + value;
    }
    private static String briefIdentity(Object o) {
        return o.getClass().getSimpleName() + "#" + Integer.toHexString(System.identityHashCode(o));
    }
    private static synchronized void write(String text) throws IOException {
        if (writer == null || bytes >= LIMIT) {
            if (writer != null) writer.close();
            Files.createDirectories(FILE.getParent());
            if (writer != null) {
                for (int i = 3; i >= 1; i--) {
                    Path from = i == 1 ? FILE : FILE.resolveSibling(FILE.getFileName() + "." + (i - 1));
                    Path to = FILE.resolveSibling(FILE.getFileName() + "." + i);
                    if (Files.exists(from)) Files.move(from, to, StandardCopyOption.REPLACE_EXISTING);
                }
            }
            writer = Files.newBufferedWriter(FILE, java.nio.charset.StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            bytes = Files.size(FILE);
            System.out.println("[SGI-DIAG] diagnostics-1 logging to " + FILE.toAbsolutePath());
        }
        writer.write(text);
        writer.newLine();
        writer.flush();
        bytes += text.length() * 3L + 1;
    }
}
