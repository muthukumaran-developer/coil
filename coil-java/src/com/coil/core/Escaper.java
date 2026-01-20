package com.coil.core;

public final class Escaper {

    private static final char ESC = '\\';

    private Escaper() {}

    public static String escape(String v) {
        return v.replace("\\", "\\\\")
                .replace(",", "\\,")
                .replace("|", "\\|")
                .replace(":", "\\:");
    }

    public static String unescape(String v) {
        StringBuilder out = new StringBuilder();
        boolean esc = false;

        for (char c : v.toCharArray()) {
            if (esc) {
                out.append(c);
                esc = false;
            } else if (c == ESC) {
                esc = true;
            } else {
                out.append(c);
            }
        }
        return out.toString();
    }
}
