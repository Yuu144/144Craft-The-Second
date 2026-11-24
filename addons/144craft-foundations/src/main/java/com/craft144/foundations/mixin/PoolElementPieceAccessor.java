package com.craft144.foundations.mixin;

import net.minecraft.world.level.levelgen.structure.PoolElementStructurePiece;
import net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplateManager;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;

@Mixin(PoolElementStructurePiece.class)
public interface PoolElementPieceAccessor {
    @Accessor("structureTemplateManager")
    StructureTemplateManager foundations$templateManager();
}
