package com.coil.util;

public final class Stats {

    public final int originalChars;
    public final int encodedChars;
    public final double savingPercent;

    private Stats(int o, int e) {
        this.originalChars = o;
        this.encodedChars = e;
        this.savingPercent = o == 0 ? 0 : (1.0 - (double)e / o) * 100.0;
    }

    public static Stats analyze(Object original, Object encoded, Object decoded) {
        String o = String.valueOf(original);
        String e = String.valueOf(encoded);
        return new Stats(o.length(), e.length());
    }

    @Override
    public String toString() {
        return "COIL Stats → original=" + originalChars +
               " encoded=" + encodedChars +
               " saving=" + String.format("%.2f", savingPercent) + "%";
    }
}
