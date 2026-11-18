import java.nio.file.*;
import java.util.*;
import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;
import org.objectweb.asm.tree.analysis.*;
import org.objectweb.asm.util.CheckClassAdapter;
import org.objectweb.asm.util.Textifier;
import org.objectweb.asm.util.TraceMethodVisitor;

public final class PatchVss implements Opcodes {
    static final String OWNER = "dev/xantha/vss/compat/StrictLodVisibility";
    static final String DESC = "(Ljava/lang/Object;Ljava/lang/Object;)V";

    static AbstractInsnNode previous(AbstractInsnNode n) {
        do { n = n.getPrevious(); } while (n != null && n.getOpcode() < 0);
        return n;
    }

    static String methodText(MethodNode method) {
        Textifier text = new Textifier();
        method.accept(new TraceMethodVisitor(text));
        java.io.StringWriter output = new java.io.StringWriter();
        text.print(new java.io.PrintWriter(output));
        return output.toString();
    }

    static void patch(MethodNode method) {
        FieldInsnNode frontier = null;
        MethodInsnNode emptyWindow = null;
        int windowCalls = 0;
        for (AbstractInsnNode n : method.instructions) {
            if (n instanceof FieldInsnNode f && f.owner.equals(OWNER)
                    && f.name.equals("FRONTIER") && frontier == null) frontier = f;
            if (n instanceof MethodInsnNode m && m.owner.equals(OWNER)
                    && m.name.equals("updateRenderWindow")) {
                windowCalls++;
                if (previous(m).getOpcode() == ICONST_0) emptyWindow = m;
            }
        }
        if (frontier == null || emptyWindow == null || windowCalls != 2)
            throw new IllegalStateException("Unexpected baseline method; refusing patch");

        // Skip inactive visibility work; clean up an earlier active view once.
        LabelNode inactiveReturn = new LabelNode();
        LabelNode active = new LabelNode();
        Object[] locals = {"java/lang/Object", "java/lang/Object", "net/minecraft/client/Minecraft"};
        InsnList guard = new InsnList();
        guard.add(new MethodInsnNode(INVOKESTATIC, OWNER, "active", "()Z", false));
        guard.add(new JumpInsnNode(IFNE, active));
        guard.add(new FieldInsnNode(GETSTATIC, OWNER, "levelIdentity", "Ljava/lang/Object;"));
        guard.add(new JumpInsnNode(IFNULL, inactiveReturn));
        guard.add(new MethodInsnNode(INVOKESTATIC, OWNER, "resetGeometry", "()V", false));
        guard.add(inactiveReturn);
        guard.add(new FrameNode(F_NEW, locals.length, locals, 0, null));
        guard.add(new InsnNode(RETURN));
        guard.add(active);
        guard.add(new FrameNode(F_NEW, locals.length, locals, 0, null));
        method.instructions.insertBefore(frontier, guard);

        // A skipped shadow/invalid viewport must preserve the main view window.
        int[] expected = {ICONST_0, DCONST_0, DCONST_0, ACONST_NULL};
        for (int opcode : expected) {
            AbstractInsnNode n = previous(emptyWindow);
            if (n.getOpcode() != opcode)
                throw new IllegalStateException("Unexpected empty-window arguments");
            method.instructions.remove(n);
        }
        method.instructions.remove(emptyWindow);
    }

    public static void main(String[] args) throws Exception {
        byte[] input = Files.readAllBytes(Path.of(args[0]));
        ClassReader reader = new ClassReader(input);
        ClassWriter writer = new ClassWriter(reader, ClassWriter.COMPUTE_MAXS);
        int[] count = {0};
        reader.accept(new ClassVisitor(ASM9, writer) {
            @Override public MethodVisitor visitMethod(int access, String name, String descriptor,
                                                       String signature, String[] exceptions) {
                MethodVisitor target = super.visitMethod(access, name, descriptor, signature, exceptions);
                if (!name.equals("beginFrame") || !descriptor.equals(DESC)) return target;
                count[0]++;
                return new MethodNode(ASM9, access, name, descriptor, signature, exceptions) {
                    @Override public void visitEnd() {
                        patch(this);
                        accept(target);
                    }
                };
            }
        }, ClassReader.EXPAND_FRAMES);
        if (count[0] != 1) throw new IllegalStateException("Expected one beginFrame method");
        byte[] output = writer.toByteArray();
        new ClassReader(output).accept(new CheckClassAdapter(new ClassWriter(0), false), 0);
        ClassNode checked = new ClassNode();
        new ClassReader(output).accept(checked, 0);
        ClassNode baseline = new ClassNode();
        reader.accept(baseline, 0);
        if (checked.methods.size() != baseline.methods.size()
                || checked.fields.size() != baseline.fields.size())
            throw new AssertionError("Class members changed unexpectedly");
        for (int i = 0; i < baseline.methods.size(); i++) {
            MethodNode before = baseline.methods.get(i), after = checked.methods.get(i);
            if (!before.name.equals(after.name) || !before.desc.equals(after.desc))
                throw new AssertionError("Method signatures changed");
            if (!before.name.equals("beginFrame") && !methodText(before).equals(methodText(after)))
                throw new AssertionError("Unrelated method changed: " + before.name);
        }
        for (MethodNode method : checked.methods) {
            if (method.name.equals("beginFrame"))
                new Analyzer<>(new BasicVerifier()).analyze(OWNER, method);
        }
        Files.write(Path.of(args[1]), output);
        System.out.println("Patched beginFrame; ASM structure/data-flow and unchanged-method checks passed.");
    }
}
