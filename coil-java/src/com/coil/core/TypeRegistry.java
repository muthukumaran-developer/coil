package com.coil.core;

import java.util.*;

public final class TypeRegistry {

    private static final Map<String, Map<String, String>> TYPES = new HashMap<>();

    private TypeRegistry() {}

    public static void register(String tableId, Map<String, String> types) {
        TYPES.put(tableId, types);
    }

    public static Map<String, String> get(String tableId) {
        return TYPES.getOrDefault(tableId, Collections.emptyMap());
    }

    public static Object restore(String value, String type) {
        try {
            return switch (type) {
                case "int" -> Integer.parseInt(value);
                case "float" -> Double.parseDouble(value);
                case "bool" -> Boolean.parseBoolean(value);
                default -> value;
            };
        } catch (Exception e) {
            return value;
        }
    }
}
