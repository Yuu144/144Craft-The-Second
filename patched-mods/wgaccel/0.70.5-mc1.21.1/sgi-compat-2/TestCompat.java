import java.lang.reflect.*;
import java.nio.file.*;
import java.util.*;
import java.util.jar.*;
import org.objectweb.asm.*;

/** Loads the real patched ModTerrain against minimal MC fixtures, without starting a game. */
public final class TestCompat {
    static final String MARKER = "net/minecraft/world/level/levelgen/DensityFunctions$BeardifierOrMarker";
    static byte[] type(String name, String[] interfaces) {
        ClassWriter w = new ClassWriter(0);
        w.visit(Opcodes.V21, Opcodes.ACC_PUBLIC, name, null, "java/lang/Object", interfaces);
        MethodVisitor m = w.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
        m.visitCode(); m.visitVarInsn(Opcodes.ALOAD, 0);
        m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
        m.visitInsn(Opcodes.RETURN); m.visitMaxs(1, 1); m.visitEnd(); w.visitEnd();
        return w.toByteArray();
    }
    static final class Fixtures extends ClassLoader {
        final Map<String, byte[]> classes = new HashMap<>();
        Fixtures(Path jar) throws Exception {
            super(ClassLoader.getPlatformClassLoader());
            try (JarFile j = new JarFile(jar.toFile())) {
                for (String name : List.of("com/wgaccel/gen/ModTerrain", "com/wgaccel/compat/SgiTerrainCompat"))
                    classes.put(name.replace('/', '.'), j.getInputStream(j.getJarEntry(name + ".class")).readAllBytes());
            }
            ClassWriter marker = new ClassWriter(0);
            marker.visit(Opcodes.V21, Opcodes.ACC_PUBLIC | Opcodes.ACC_INTERFACE | Opcodes.ACC_ABSTRACT,
                MARKER, null, "java/lang/Object", null);
            marker.visitEnd();
            classes.put(MARKER.replace('/', '.'), marker.toByteArray());
            for (String name : List.of("net/minecraft/world/level/levelgen/Beardifier",
                "test/OrdinaryWrapper", "com/vivideru/sgi/worldgen/TerrainShaper$Function"))
                classes.put(name.replace('/', '.'), type(name, new String[]{MARKER}));
            ClassWriter names = new ClassWriter(0);
            names.visit(Opcodes.V21, Opcodes.ACC_PUBLIC, "com/wgaccel/platform/Names", null, "java/lang/Object", null);
            MethodVisitor m = names.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | Opcodes.ACC_VARARGS,
                "method", "(Ljava/lang/Class;Ljava/lang/String;[Ljava/lang/Class;)Ljava/lang/reflect/Method;",
                null, new String[]{"java/lang/NoSuchMethodException"});
            m.visitCode(); m.visitTypeInsn(Opcodes.NEW, "java/lang/NoSuchMethodException"); m.visitInsn(Opcodes.DUP);
            m.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/NoSuchMethodException", "<init>", "()V", false);
            m.visitInsn(Opcodes.ATHROW); m.visitMaxs(2, 3); m.visitEnd(); names.visitEnd();
            classes.put("com.wgaccel.platform.Names", names.toByteArray());
        }
        protected Class<?> findClass(String name) throws ClassNotFoundException {
            byte[] data = classes.get(name);
            if (data == null) throw new ClassNotFoundException(name);
            return defineClass(name, data, 0, data.length);
        }
    }
    public static void main(String[] args) throws Exception {
        Fixtures loader = new Fixtures(Path.of(args[0]));
        Class<?> marker = loader.loadClass(MARKER.replace('/', '.'));
        Class<?> modTerrain = loader.loadClass("com.wgaccel.gen.ModTerrain");
        Method shapes = modTerrain.getMethod("shapes", marker), top = modTerrain.getMethod("top", marker);
        for (String name : List.of("net.minecraft.world.level.levelgen.Beardifier", "test.OrdinaryWrapper")) {
            Object ordinary = loader.loadClass(name).getConstructor().newInstance();
            if (!Boolean.FALSE.equals(shapes.invoke(null, ordinary))
                || !Integer.valueOf(Integer.MIN_VALUE).equals(top.invoke(null, ordinary)))
                throw new AssertionError("Ordinary behavior changed: " + name);
        }
        if (!Boolean.FALSE.equals(shapes.invoke(null, new Object[]{null}))
            || !Integer.valueOf(Integer.MIN_VALUE).equals(top.invoke(null, new Object[]{null})))
            throw new AssertionError("Null behavior changed");
        Object sgi = loader.loadClass("com.vivideru.sgi.worldgen.TerrainShaper$Function").getConstructor().newInstance();
        if (!Boolean.TRUE.equals(shapes.invoke(null, sgi))
            || !Integer.valueOf(Integer.MAX_VALUE).equals(top.invoke(null, sgi)))
            throw new AssertionError("SGI fallback missing");
        System.out.println("PASS: SGI selects CPU/full height; vanilla, other wrappers and null keep baseline decisions.");
    }
}
