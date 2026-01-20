package com.coil.core;

import java.util.*;

public final class TableEncoder {

    private static int TABLE_SEQ = 0;

    private TableEncoder() {}

    public static boolean isTable(List<?> arr) {
        if (arr.size() < 2) return false;
        for (Object o : arr) if (!(o instanceof Map)) return false;
        return true;
    }

    public static Map<String, Object> encodeTable(List<Map<String, Object>> records) {

        TABLE_SEQ++;
        String tid = "tbl_" + TABLE_SEQ;

        LinkedHashSet<String> keySet = new LinkedHashSet<>();
        for (Map<String, Object> r : records) keySet.addAll(r.keySet());
        List<String> keys = new ArrayList<>(keySet);

        StringBuilder body = new StringBuilder();
        body.append("BODY|table[").append(records.size()).append("]{")
            .append(String.join(",", keys)).append("}");

        for (Map<String, Object> r : records) {
            body.append("|");
            List<String> row = new ArrayList<>();
            for (String k : keys) {
                Object v = r.getOrDefault(k, "");
                row.add(Escaper.escape(String.valueOf(v)));
            }
            body.append(String.join(",", row));
        }

        String meta = "META&ORDER=" + String.join(",", keys) + "&tid=" + tid;

        Map<String, String> types = new HashMap<>();
        for (String k : keys) {
            Object v = records.get(0).get(k);
            types.put(k, v == null ? "str" : v.getClass().getSimpleName().toLowerCase());
        }
        TypeRegistry.register(tid, types);

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("meta", meta);
        out.put("body", body.toString());

        return out;
    }
}
