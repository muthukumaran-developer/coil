const fs = require("fs");
const { esc, tokenCount, PAIR, REC } = require("./utils");

let TABLE_SEQ = 0;
let TYPE_REGISTRY = {};

function isTable(arr) {
  return Array.isArray(arr) && arr.length >= 2 && arr.every(x => typeof x === "object" && !Array.isArray(x));
}

function isCategorical(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return false;
  if (!arr.every(x => typeof x === "string")) return false;
  return new Set(arr).size <= arr.length * 0.7;
}

function collectKeys(records) {
  const set = new Set();
  records.forEach(r => Object.keys(r).forEach(k => set.add(k)));
  return [...set].sort();
}

function greedyVmap(records, keys) {
  const freq = {};
  records.forEach(r => keys.forEach(k => {
    const v = String(r[k] ?? "");
    freq[v] = (freq[v] || 0) + 1;
  }));

  const candidates = Object.keys(freq)
    .filter(v => freq[v] >= 2)
    .sort((a, b) => (freq[b] * b.length) - (freq[a] * a.length));

  let accepted = {};
  let baseline = tokenCount(JSON.stringify(records));

  while (true) {
    let best = { gain: 0 };

    for (const val of candidates) {
      if (accepted[val]) continue;
      const tok = "V" + (Object.keys(accepted).length + 1);
      const test = { ...accepted, [val]: tok };

      const rows = records.map(r =>
        keys.map(k => test[String(r[k] ?? "")] || esc(String(r[k] ?? ""))).join(PAIR)
      );

      const body = REC + ["table", ...rows].join(REC);
      const meta = "META&ORDER=" + keys.join(",") + "&vmap=" +
        Object.entries(test).map(([v, t]) => `${t}:${v}`).join(";");

      const tokens = tokenCount(meta + "|" + body);
      const gain = baseline - tokens;
      if (gain > best.gain) best = { gain, val, tok };
    }

    if (best.gain > 0) {
      accepted[best.val] = best.tok;
      baseline -= best.gain;
    } else break;
  }

  return accepted;
}

function encodeTable(records) {
  TABLE_SEQ++;
  const tid = "tbl_" + TABLE_SEQ;
  const keys = collectKeys(records);
  const vmap = greedyVmap(records, keys);

  const rows = records.map(r =>
    keys.map(k => vmap[String(r[k] ?? "")] || esc(String(r[k] ?? ""))).join(PAIR)
  );

  const body = REC + [`table[${records.length}]{${keys.join(",")}}`, ...rows].join(REC);

  let meta = `META&ORDER=${keys.join(",")}&tid=${tid}`;
  if (Object.keys(vmap).length) {
    meta += "&vmap=" + Object.entries(vmap).map(([v, t]) => `${t}:${v}`).join(";");
  }

  const encTok = tokenCount(meta + "|" + body);
  const orgTok = tokenCount(JSON.stringify(records));

  if (encTok >= orgTok) return records;

  TYPE_REGISTRY[tid] = {};
  keys.forEach(k => {
    const v = records.find(r => r[k] !== undefined)?.[k];
    TYPE_REGISTRY[tid][k] = v === null ? "NoneType" : typeof v;
  });

  return { meta, body: "BODY" + body };
}

function encodeAny(obj) {
  if (isTable(obj)) return encodeTable(obj);
  if (isCategorical(obj)) return encodeTable(obj.map(x => ({ msg: x })));
  if (Array.isArray(obj)) return obj.map(encodeAny);
  if (typeof obj === "object" && obj !== null) {
    const out = {};
    for (const k in obj) out[k] = encodeAny(obj[k]);
    return out;
  }
  return obj;
}

function encode(payload, typeFile = "coil_types.json") {
  TABLE_SEQ = 0;
  TYPE_REGISTRY = {};
  const result = encodeAny(JSON.parse(JSON.stringify(payload)));
  fs.writeFileSync(typeFile, JSON.stringify(TYPE_REGISTRY, null, 2));
  return result;
}

module.exports = { encode };
