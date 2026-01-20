package com.coil;

import com.coil.encoder.Encoder;
import com.coil.decoder.Decoder;
import com.coil.util.Stats;

public final class COIL {

    private static boolean DEBUG = false;

    private COIL() {}

    public static void debugMode(boolean flag) {
        DEBUG = flag;
    }

    static void log(String msg) {
        if (DEBUG) System.out.println("[COIL] " + msg);
    }

    public static Object encode(Object data) {
        log("Encoding started");
        return Encoder.encode(data);
    }

    public static Object decode(Object encoded) {
        log("Decoding started");
        return Decoder.decode(encoded);
    }

    public static Stats stats(Object original, Object encoded, Object decoded) {
        return Stats.analyze(original, encoded, decoded);
    }

    public static String info() {
        return "COIL Java Library v0.1 — Compact Object Interchange Layer";
    }
}
