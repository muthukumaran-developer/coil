package com.coil.core;

import java.util.*;

public final class TableDecoder {

    private TableDecoder() {}

    public static List<Map<String, Object>> decodeTable(String meta, String body) {

        meta = meta.replace("META&", "");
        body = body.replace("BODY|", "");

        Map<String, String> metaKV = new HashMap<>();
        for (String p : meta.split("&")) {
            if (p.contains("=")) {
                String[] kv = p.split("=", 2);
                metaKV.put(kv[0], kv[1]);
            }
        }

        String[] keys = metaKV.get("ORDER").split(",");
        String tid = metaKV.get("tid");

        Map<String, String> types = TypeRegistry.get(tid);

        String[] rows = body.split("\\|");
        List<Map<String, Object>> out = new ArrayList<>();

        for (int i = 1; i < rows.length; i++) {
            String[] vals = rows[i].split(",");
            Map<String, Object> rec = new LinkedHashMap<>();

            for (int j = 0; j < keys.length; j++) {
                String raw = j < vals.length ? Escaper.unescape(vals[j]) : "";
                String type = types.getOrDefault(keys[j], "str");
                rec.put(keys[j], TypeRegistry.restore(raw, type));
            }
            out.add(rec);
        }
        return out;
    }
}
