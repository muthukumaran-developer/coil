const fs = require("fs");
const { unesc, PAIR, REC } = require("./utils");

function restore(val, type) {
  if (type === "int") return parseInt(val);
  if (type === "float") return parseFloat(val);
  if (type === "bool") return val === "true";
  if (type === "NoneType") return null;
  return val;
}

function decodeTable(meta, body, types) {
  meta = meta.replace("META&", "");
  body = body.replace("BODY", "");

  const kv = Object.fromEntries(meta.split("&").map(x => x.split("=")));
  const keys = kv.ORDER.split(",");
  const tid = kv.tid;
  const colTypes = types[tid] || {};
  const vmap = {};

  if (kv.vmap) {
    kv.vmap.split(";").forEach(e => {
      const [t, v] = e.split(":");
      vmap[t] = v;
    });
  }

  const rows = body.split(REC).slice(2);
  const records = rows.map(row => {
    const vals = row.split(PAIR);
    const rec = {};
    keys.forEach((k, i) => {
      const raw = vals[i] || "";
      const val = vmap[raw] || unesc(raw);
      rec[k] = restore(val, colTypes[k]);
    });
    return rec;
  });

  if (Object.keys(colTypes).length === 1 && colTypes.msg)
    return records.map(r => r.msg);

  return records;
}

function decodeAny(obj, types) {
  if (obj && obj.meta && obj.body)
    return decodeTable(obj.meta, obj.body, types);

  if (Array.isArray(obj)) return obj.map(x => decodeAny(x, types));
  if (typeof obj === "object" && obj !== null) {
    const out = {};
    for (const k in obj) out[k] = decodeAny(obj[k], types);
    return out;
  }
  return obj;
}

function decode(payload, typeFile = "coil_types.json") {
  const types = JSON.parse(fs.readFileSync(typeFile));
  return decodeAny(JSON.parse(JSON.stringify(payload)), types);
}

module.exports = { decode };
