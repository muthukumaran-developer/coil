package com.coil.decoder;

import java.util.*;
import com.coil.core.TableDecoder;

public final class Decoder {

    private Decoder() {}

    @SuppressWarnings("unchecked")
    public static Object decode(Object obj) {

        if (obj instanceof Map<?, ?>) {
            Map<?, ?> map = (Map<?, ?>) obj;

            if (map.containsKey("meta") && map.containsKey("body")) {
                return TableDecoder.decodeTable(
                        String.valueOf(map.get("meta")),
                        String.valueOf(map.get("body"))
                );
            }

            Map<String, Object> out = new LinkedHashMap<>();
            for (Object k : map.keySet()) {
                out.put(String.valueOf(k), decode(map.get(k)));
            }
            return out;
        }

        if (obj instanceof List<?>) {
            List<Object> out = new ArrayList<>();
            for (Object x : (List<?>) obj) out.add(decode(x));
            return out;
        }

        return obj;
    }
}
