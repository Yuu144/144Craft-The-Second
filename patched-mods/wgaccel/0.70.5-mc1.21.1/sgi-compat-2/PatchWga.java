import java.nio.file.*;
import java.util.*;
import java.util.jar.*;
import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;
import org.objectweb.asm.tree.analysis.*;

public final class PatchWga {
    static final String TARGET = "com/wgaccel/gen/ModTerrain.class";
    static final String HELPER = "com/wgaccel/compat/SgiTerrainCompat";

    public static void main(String[] args) throws Exception {
        int changed = 0;
        try (JarFile input = new JarFile(args[0]);
             JarOutputStream output = new JarOutputStream(Files.newOutputStream(Path.of(args[1])))) {
            if (input.getEntry(HELPER + ".class") != null) throw new IllegalStateException("Already patched");
            for (JarEntry entry : Collections.list(input.entries())) {
                byte[] data = input.getInputStream(entry).readAllBytes();
                if (entry.getName().equals(TARGET)) {
                    ClassNode node = new ClassNode();
                    new ClassReader(data).accept(node, 0);
                    for (MethodNode method : node.methods) {
                        if (!Set.of("shapes", "top").contains(method.name)) continue;
                        String descriptor = "(Lnet/minecraft/world/level/levelgen/DensityFunctions$BeardifierOrMarker;)"
                            + (method.name.equals("shapes") ? "Z" : "I");
                        if (!method.desc.equals(descriptor) || (method.access & Opcodes.ACC_STATIC) == 0)
                            throw new IllegalStateException("Unexpected signature: " + method.name + method.desc);
                        LabelNode original = new LabelNode();
                        InsnList guard = new InsnList();
                        guard.add(new VarInsnNode(Opcodes.ALOAD, 0));
                        guard.add(new LdcInsnNode(method.name));
                        guard.add(new MethodInsnNode(Opcodes.INVOKESTATIC, HELPER, "detect",
                            "(Ljava/lang/Object;Ljava/lang/String;)Z", false));
                        guard.add(new JumpInsnNode(Opcodes.IFEQ, original));
                        guard.add(new LdcInsnNode(method.name.equals("shapes") ? 1 : Integer.MAX_VALUE));
                        guard.add(new InsnNode(Opcodes.IRETURN));
                        guard.add(original);
                        guard.add(new FrameNode(Opcodes.F_SAME, 0, null, 0, null));
                        method.instructions.insert(guard);
                        changed++;
                    }
                    if (changed != 2) throw new IllegalStateException("Expected exactly two methods");
                    ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                    node.accept(writer);
                    data = writer.toByteArray();
                    ClassNode verify = new ClassNode();
                    new ClassReader(data).accept(verify, 0);
                    for (MethodNode method : verify.methods)
                        new Analyzer<>(new BasicVerifier()).analyze(verify.name, method);
                }
                JarEntry copy = new JarEntry(entry.getName());
                copy.setTime(0);
                output.putNextEntry(copy); output.write(data); output.closeEntry();
            }
            JarEntry helper = new JarEntry(HELPER + ".class");
            helper.setTime(0); output.putNextEntry(helper);
            output.write(Files.readAllBytes(Path.of(args[2]).resolve(HELPER + ".class")));
            output.closeEntry();
        }
        if (changed != 2) throw new IllegalStateException("Target class missing");
        System.out.println("Verified selective guards in ModTerrain.top and ModTerrain.shapes");
    }
}
