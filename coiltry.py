import json
import coil_python as C
print(C.info())
print(C.__file__)
# Enable debug logs
C.debugMode(True)
C.set_model("default")

# Load input JSON
with open("coiltest.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Encode
encoded = C.encode(data)

# Save encoded output
with open("coilenc.json", "w", encoding="utf-8") as f:
    json.dump(encoded, f, indent=2, ensure_ascii=False)

# Decode
decoded = C.decode(encoded)
stats = C.stats(decoded, encoded,"coilstats.json")
# Save decoded output
with open("coildec.json", "w", encoding="utf-8") as f:
    json.dump(decoded, f, indent=2, ensure_ascii=False)

print("✅ Encoding and decoding completed.")
print("📄 Files written:")
print(" - coilenc.json")
print(" - coildec.json")
