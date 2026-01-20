import com.coil.COIL;
import java.nio.file.*;

public class CoilTest {

    public static void main(String[] args) throws Exception {

        // 1. Read huge file as raw text
        String jsonText = Files.readString(Path.of("coiltest.json"));

        // 2. Encode (as payload)
        Object encoded = COIL.encode(jsonText);

        // 3. Decode
        Object decoded = COIL.decode(encoded);

        // 4. Print lengths
        System.out.println("===== SIZE STATS =====");
        System.out.println("Original chars : " + jsonText.length());
        System.out.println("Encoded chars  : " + encoded.toString().length());
        System.out.println("Decoded chars  : " + decoded.toString().length());

        // 5. Preview output
        System.out.println("\n===== ORIGINAL (first 1000 chars) =====");
        System.out.println(jsonText.substring(0, Math.min(1000, jsonText.length())));

        System.out.println("\n===== COIL ENCODED =====");
        System.out.println(encoded);

        // System.out.println("\n===== DECODED =====");
        // System.out.println(decoded);

        // 6. COIL stats
        System.out.println("\n===== COIL STATS =====");
        System.out.println(COIL.stats(jsonText, encoded, decoded));
    }
}
