// compare.js — semantic lossless validator

function extractRows(obj) {
  if (Array.isArray(obj)) return obj;

  if (obj && typeof obj === "object") {
    for (const k in obj) {
      if (Array.isArray(obj[k])) return obj[k];
    }
  }
  return [];
}

function canonicalRow(row) {
  if (typeof row !== "object" || row === null) return String(row);

  return Object.keys(row)
    .sort()
    .map(k => `${k}:${String(row[k])}`)
    .join("|");
}

function isLossless(original, decoded) {
  const oRows = extractRows(original);
  const dRows = extractRows(decoded);

  if (!oRows.length || !dRows.length) return false;

  const count = rows => {
    const map = {};
    rows.forEach(r => {
      const key = canonicalRow(r);
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  };

  const oMap = count(oRows);
  const dMap = count(dRows);

  if (Object.keys(oMap).length !== Object.keys(dMap).length) return false;

  for (const k in oMap) {
    if (oMap[k] !== dMap[k]) return false;
  }

  return true;
}

module.exports = { isLossless };
