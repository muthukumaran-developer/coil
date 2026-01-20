package com.coil.encoder;

import java.util.*;
import com.coil.core.TableEncoder;

public final class Encoder {

    private Encoder() {}

    @SuppressWarnings("unchecked")
    public static Object encode(Object obj) {

        if (obj instanceof List<?>) {
            List<?> list = (List<?>) obj;

            if (TableEncoder.isTable(list)) {
                return TableEncoder.encodeTable((List<Map<String, Object>>) list);
            }

            List<Object> out = new ArrayList<>();
            for (Object x : list) out.add(encode(x));
            return out;
        }

        if (obj instanceof Map<?, ?>) {
            Map<String, Object> out = new LinkedHashMap<>();
            Map<?, ?> m = (Map<?, ?>) obj;

            for (Object k : m.keySet()) {
                out.put(String.valueOf(k), encode(m.get(k)));
            }
            return out;
        }

        return obj;
    }
}
