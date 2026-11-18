import java.nio.file.*;
import java.util.*;
import org.objectweb.asm.*;
import org.objectweb.asm.commons.*;
import org.objectweb.asm.tree.*;

public class PrepareHarness implements Opcodes {
    public static void main(String[] args) throws Exception {
        ClassNode source = new ClassNode();
        new ClassReader(Files.readAllBytes(Path.of(args[0]))).accept(source, ClassReader.EXPAND_FRAMES);
        MethodNode method = source.methods.stream().filter(m -> m.name.equals("beginFrame")).findFirst().orElseThrow();
        AbstractInsnNode cut = null;
        for (AbstractInsnNode n : method.instructions) {
            if (n instanceof LdcInsnNode l && "nodeManager".equals(l.cst)) {
                cut = PatchVss.previous(n);
                break;
            }
        }
        if (cut == null || cut.getOpcode() != ALOAD) throw new AssertionError("Missing geometry boundary");
        while (cut != null) {
            AbstractInsnNode next = cut.getNext();
            method.instructions.remove(cut);
            cut = next;
        }
        method.tryCatchBlocks.clear();
        method.localVariables = null;
        method.instructions.add(new FieldInsnNode(GETSTATIC, PatchVss.OWNER, "passed", "I"));
        method.instructions.add(new InsnNode(ICONST_1));
        method.instructions.add(new InsnNode(IADD));
        method.instructions.add(new FieldInsnNode(PUTSTATIC, PatchVss.OWNER, "passed", "I"));
        method.instructions.add(new InsnNode(RETURN));
        Map<String,String> names = Map.of(
            PatchVss.OWNER, "VisibilityHarness",
            "net/minecraft/client/Minecraft", "VisibilityHarness$Game",
            "net/minecraft/client/multiplayer/ClientLevel", "VisibilityHarness$Level",
            "net/minecraft/client/player/LocalPlayer", "VisibilityHarness$Player",
            "dev/xantha/vss/networking/client/StrictLodFrontier", "VisibilityHarness$Frontier",
            "dev/xantha/vss/networking/client/VSSClientNetworking", "VisibilityHarness$Network");
        ClassNode harness = new ClassNode();
        new ClassReader(Files.readAllBytes(Path.of(args[1]))).accept(harness, 0);
        MethodNode replacement = new MethodNode(ASM9, ACC_STATIC, "beginFrame", PatchVss.DESC, null, null);
        method.accept(new MethodRemapper(replacement, new SimpleRemapper(names)));
        harness.methods.removeIf(m -> m.name.equals("beginFrame"));
        harness.methods.add(replacement);
        ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        harness.accept(writer);
        Files.write(Path.of(args[1]), writer.toByteArray());
    }
}
