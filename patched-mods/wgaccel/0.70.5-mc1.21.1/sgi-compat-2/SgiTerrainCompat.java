package com.wgaccel.compat;

/** No linkage to SGI; ordinary chunks retain WGA's original decisions. */
public final class SgiTerrainCompat {
    public static boolean detect(Object beardifier, String path) {
        return beardifier != null && beardifier.getClass().getName()
            .equals("com.vivideru.sgi.worldgen.TerrainShaper$Function");
    }
}
