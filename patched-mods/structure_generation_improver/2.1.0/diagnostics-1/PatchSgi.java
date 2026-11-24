import java.nio.file.*;
import java.util.*;
import java.util.jar.*;
import org.objectweb.asm.*;
import org.objectweb.asm.commons.AdviceAdapter;
import org.objectweb.asm.tree.*;
import org.objectweb.asm.tree.analysis.*;

public final class PatchSgi {
    static final String HELPER = "com/vivideru/sgi/diagnostics/SgiDiagnostics";
    static final Map<String, Set<String>> TARGETS = Map.of(
        "com/vivideru/sgi/worldgen/TerrainConformUtil", Set.of("expandReferencesImpl", "shaperForImpl"),
        "com/vivideru/sgi/worldgen/StructureFilter", Set.of("plan", "evaluate", "site", "clearCache"),
        "com/vivideru/sgi/worldgen/TerrainShaper", Set.of("wrapping"),
        "com/vivideru/sgi/worldgen/TerrainShaper$Function", Set.of("<init>", "fillColumn"),
        "com/vivideru/sgi/mixin/ChunkGeneratorMixin", Set.of("sgi$expandReferences"),
        "com/vivideru/sgi/mixin/NoiseBasedChunkGeneratorMixin", Set.of("sgi$createNoiseChunk", "sgi$guardRaisedGround")
    );
    public static void main(String[] args) throws Exception {
        Path input = Path.of(args[0]), output = Path.of(args[1]), classes = Path.of(args[2]);
        Set<String> changed = new TreeSet<>();
        try (JarFile jar = new JarFile(input.toFile());
             JarOutputStream out = new JarOutputStream(Files.newOutputStream(output))) {
            for (JarEntry entry : Collections.list(jar.entries())) {
                byte[] data = jar.getInputStream(entry).readAllBytes();
                String name = entry.getName();
                String owner = name.endsWith(".class") ? name.substring(0, name.length() - 6) : "";
                if (TARGETS.containsKey(owner)) {
                    ClassReader reader = new ClassReader(data);
                    ClassWriter writer = new ClassWriter(reader, ClassWriter.COMPUTE_MAXS);
                    reader.accept(new ClassVisitor(Opcodes.ASM9, writer) {
                        public MethodVisitor visitMethod(int access, String method, String descriptor,
                                                         String signature, String[] exceptions) {
                            MethodVisitor mv = super.visitMethod(access, method, descriptor, signature, exceptions);
                            if (!TARGETS.get(owner).contains(method)) return mv;
                            changed.add(owner + "." + method);
                            return new AdviceAdapter(Opcodes.ASM9, mv, access, method, descriptor) {
                                void log(String phase, Type value) {
                                    if (value == null) visitInsn(ACONST_NULL);
                                    else { if (value.getSize() == 2) dup2(); else dup(); box(value); }
                                    push(phase); push(owner + "." + method);
                                    if ((access & Opcodes.ACC_STATIC) != 0) visitInsn(ACONST_NULL);
                                    else loadThis();
                                    loadArgArray();
                                    visitMethodInsn(INVOKESTATIC, HELPER, "eventResult",
                                        "(Ljava/lang/Object;Ljava/lang/String;Ljava/lang/String;Ljava/lang/Object;[Ljava/lang/Object;)V", false);
                                }
                                protected void onMethodEnter() { log("ENTER", null); }
                                protected void onMethodExit(int opcode) {
                                    log(opcode == ATHROW ? "THROW" : "EXIT",
                                        opcode == RETURN ? null : opcode == ATHROW
                                        ? Type.getType(Throwable.class) : Type.getReturnType(descriptor));
                                }
                            };
                        }
                    }, ClassReader.EXPAND_FRAMES);
                    data = writer.toByteArray();
                    ClassNode node = new ClassNode();
                    new ClassReader(data).accept(node, 0);
                    for (MethodNode method : node.methods) {
                        if ((method.access & (Opcodes.ACC_ABSTRACT | Opcodes.ACC_NATIVE)) == 0)
                            new Analyzer<>(new BasicVerifier()).analyze(node.name, method);
                    }
                }
                JarEntry copy = new JarEntry(name);
                copy.setTime(0);
                out.putNextEntry(copy); out.write(data); out.closeEntry();
            }
            JarEntry helper = new JarEntry(HELPER + ".class");
            helper.setTime(0); out.putNextEntry(helper);
            out.write(Files.readAllBytes(classes.resolve(HELPER + ".class"))); out.closeEntry();
        }
        int expected = TARGETS.values().stream().mapToInt(Set::size).sum();
        if (changed.size() != expected) throw new IllegalStateException("Expected " + expected + " hooks, found " + changed);
        System.out.println("Verified " + changed.size() + " diagnostic hooks:");
        changed.forEach(System.out::println);
    }
}
