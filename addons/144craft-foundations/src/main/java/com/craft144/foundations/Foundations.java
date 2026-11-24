package com.craft144.foundations;

import com.mojang.logging.LogUtils;
import java.util.List;
import net.neoforged.fml.ModContainer;
import net.neoforged.fml.ModList;
import net.neoforged.fml.common.Mod;
import net.neoforged.fml.config.ModConfig;
import net.neoforged.neoforge.common.ModConfigSpec;
import org.slf4j.Logger;

@Mod(Foundations.ID)
public final class Foundations {
    public static final String ID = "craft144_foundations";
    public static final Logger LOG = LogUtils.getLogger();
    public static final ModConfigSpec SPEC;
    public static final ModConfigSpec.BooleanValue ENABLED;
    public static final ModConfigSpec.IntValue MAX_RISE;
    public static final ModConfigSpec.IntValue SKIRT;
    public static final ModConfigSpec.ConfigValue<List<? extends String>> EXCLUDED;
    public static final ModConfigSpec.ConfigValue<List<? extends String>> MIXED;
    public static boolean sgiPresent;

    static {
        ModConfigSpec.Builder b = new ModConfigSpec.Builder();
        ENABLED = b.comment("Only affects new chunks. Requires SGI to be removed.").define("enabled", true);
        MAX_RISE = b.comment("Maximum air gap filled, in blocks.").defineInRange("maxRise", 12, 1, 24);
        SKIRT = b.comment("Additional horizontal slope around supports.").defineInRange("skirt", 6, 0, 16);
        MIXED = b.comment("Mixed surface/underground IDs allowed past the generation-step filter.",
                "Basement and room-column protections still apply.")
            .defineListAllowEmpty("mixedSurfaceStructures", List.of("dungeons_arise:mining_complex"),
                value -> value instanceof String s && s.contains(":"));
        EXCLUDED = b.comment("Structure IDs or namespace:* wildcards. Add special structures here.")
            .defineListAllowEmpty("excludedStructures", List.of(
                "dungeons_arise_seven_seas:*", "nullscape:*",
                "dungeons_arise:aviary", "dungeons_arise:mechanical_nest",
                "dungeons_arise:heavenly_challenger", "dungeons_arise:heavenly_conqueror",
                "dungeons_arise:heavenly_rider", "dungeons_arise:small_blimp",
                "dungeons_arise:illager_corsair", "dungeons_arise:illager_galley",
                "dungeons_arise:undead_pirate_ship", "dungeons_arise:typhon",
                "cataclysm:acropolis", "cataclysm:sunken_city",
                "irons_spellbooks:impaled_icebreaker",
                "minecraft:shipwreck", "minecraft:shipwreck_beached",
                "minecraft:monument", "minecraft:ocean_ruin_cold", "minecraft:ocean_ruin_warm",
                "minecraft:ruined_portal_ocean", "loconautics:rail_grid",
                "twilightforest:giant_house"
            ), value -> value instanceof String s && s.contains(":"));
        SPEC = b.build();
    }

    public Foundations(ModContainer container) {
        container.registerConfig(ModConfig.Type.COMMON, SPEC);
        sgiPresent = ModList.get().isLoaded("structure_generation_improver");
        if (sgiPresent) {
            LOG.warn("144Craft Foundations is inactive: remove SGI before using this replacement.");
        } else {
            LOG.info("144Craft Foundations loaded: raise-only, chunk-local foundations.");
        }
    }

    public static boolean active() {
        return !sgiPresent && ENABLED.get();
    }

    public static boolean excluded(String id) {
        for (String rule : EXCLUDED.get()) {
            if (rule.equals(id) || rule.endsWith(":*") && id.startsWith(rule.substring(0, rule.length() - 1))) {
                return true;
            }
        }
        return false;
    }
}
