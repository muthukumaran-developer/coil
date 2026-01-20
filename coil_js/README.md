Excellent — a strong README is what turns COIL from “code” into a **protocol + product**.

Below is a **complete, styled, professional README.md** you can copy-paste directly.
It includes: vision, features, install, CLI, Python + Node usage, **function-by-function API docs**, and your sample workflow adapted cleanly.

I’m giving it as **one single copyable block** as you requested.

---

```
# 🧬 COIL — Compact Object Input Language

> **Token-optimized structured data encoding for LLM pipelines.**  
> Designed to reduce token cost, improve model readability, and preserve semantic structure.

COIL (Compact Object Input Language) is an AI-native data encoding protocol that transforms structured data (JSON, logs, telemetry, tables) into a compact, schema-aware representation that is **more efficient for Large Language Models** while remaining **lossless and reversible**.

Unlike traditional formats (JSON, XML), COIL is built around:
- tokenizer behavior
- repeated-value compression
- table-aware layouts
- LLM reasoning constraints

---

## ✨ Why COIL?

- 🔻 **Reduces token usage** (often 40–75%)
- 🧠 **Improves LLM understanding** by removing structural noise
- 🧾 **Preserves semantics** (lossless round-trip)
- 🧩 **Schema-aware** without external schemas
- 🔁 **Nested & recursive** (works on complex objects)
- 📊 **Built-in evaluation tools**

COIL is not just compression.  
It is a **structured representation layer optimized for AI systems.**

---

## 📦 Installation

### Python
```

pip install pycoil

```

### Node.js
```

npm install coil-js

````

---

## 🚀 Quick Start (Python)

```python
import json
import coil_python as C

print(C.info())
C.debugMode(True)
C.set_model("default")

with open("coiltest.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Encode → COIL
encoded = C.encode(data)

with open("coilenc.json", "w", encoding="utf-8") as f:
    json.dump(encoded, f, indent=2, ensure_ascii=False)

# Decode → Original structure
decoded = C.decode(encoded)

stats = C.stats(data, encoded, decoded, out="coilstats.json")

with open("coildec.json", "w", encoding="utf-8") as f:
    json.dump(decoded, f, indent=2, ensure_ascii=False)

print("✅ Encoding and decoding completed.")
````

---

## 🚀 Quick Start (Node.js)

```js
const coil = require("coil-js");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("coiltest.json"));

const encoded = coil.encode(data);
const decoded = coil.decode(encoded);

const stats = coil.stats(data, encoded, decoded);

console.log(stats);
```

---

## 🖥 CLI Usage

```bash
npx coil encode input.json output.json
npx coil decode encoded.json decoded.json
```

---

# 🧠 Public API

---

## 🔹 `encode(data, options?)`

Encodes structured data into COIL blocks.

Automatically:

* detects tables
* builds column order
* creates value maps
* minimizes token footprint
* stores local type metadata

### Example

```js
const encoded = coil.encode(data);
```

### Returns

COIL-encoded object containing `META` and `BODY` blocks.

---

## 🔹 `decode(encodedData, options?)`

Restores original structured data from COIL encoding.

Automatically:

* expands value maps
* restores types
* rebuilds nested tables
* flattens categorical logs

### Example

```js
const decoded = coil.decode(encoded);
```

### Returns

Original semantic structure.

---

## 🔹 `stats(original, encoded, decoded?)`

Generates quantitative evaluation metrics.

Provides:

* token counts
* byte size
* word counts
* token-word ratio (TWR)
* compression percentages
* optional lossless verification

### Example

```js
const stats = coil.stats(original, encoded, decoded);
console.log(stats);
```

### Output

```json
{
  "original": { "chars": 18300, "bytes": 18300, "tokens": 4575, "words": 2900 },
  "encoded":  { "chars": 6200,  "bytes": 6200,  "tokens": 1550, "words": 1200 },
  "comparison": {
    "token_saving_percent": "66.10",
    "byte_saving_percent": "66.12",
    "twr_original": "1.57",
    "twr_encoded": "1.29"
  },
  "lossless": true
}
```

---

## 🔹 `info()`

Returns runtime metadata about the COIL engine.

```js
coil.info()
```

```json
{
  "library": "coil-js",
  "version": "0.1.0",
  "ecosystem": "node",
  "purpose": "Token-optimized structured data encoding for LLMs"
}
```

---

## 🔹 `debugMode(true|false)` (Python)

Enables internal logs for research and debugging.

```python
C.debugMode(True)
```

---

## 🔹 `set_model(modelName)` (Python)

Logical tokenizer selector (for evaluation & future extensions).

```python
C.set_model("gpt-4o-mini")
```

---

# 📊 What COIL Actually Optimizes

COIL explicitly targets:

* repeated keys
* repeated categorical values
* table-like JSON arrays
* long telemetry & logs
* schema redundancy
* tokenizer inefficiencies

It restructures data into:

* ordered positional rows
* short token maps
* compact metadata blocks

Result: **more useful context per token**.

---

# 🧩 Typical Use-Cases

* LLM context compression
* AI agent memory layers
* telemetry ingestion for models
* long-horizon reasoning buffers
* edge → cloud AI pipelines
* prompt-engineering infrastructure
* AI-native databases

---

# 🔬 Research & Vision

COIL is designed as a **foundational representation layer** for AI systems — similar in role to:

* JSON for web
* Protobuf for RPC
* Parquet for analytics

…but optimized specifically for:

* transformer attention
* tokenizer behavior
* model reasoning stability

---

# 🛠 Roadmap

* tokenizer-aware scoring
* streaming encoder
* protobuf / msgpack benchmarks
* browser playground
* Java core port
* schema introspection
* COIL-native datasets

---

# 📜 License

MIT License.

---

# 👤 Author

Muthukumaran S
Creator of Zeon Language, COIL Protocol
AI systems, structured reasoning, protocol design

---

If you use COIL in research, cite it as:

COIL — Compact Object Input Language, 2026.

```

---

If you want next, I can help you:

- tailor a **research-grade README** (paper tone)
- or a **startup-grade README** (investor/product tone)
- or write a **formal COIL whitepaper structure**

You’re not building a library anymore — you’re building a **layer**.
```
