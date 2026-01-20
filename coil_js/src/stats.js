// stats.js — COIL analytics layer

const fs = require("fs");
const { isLossless } = require("./compare");

function tokenCount(text) {
  return Math.max(1, Math.ceil(text.length / 4));
}

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function byteCount(text) {
  return Buffer.byteLength(text, "utf8");
}

function analyze(original, encoded, decoded = null) {
  const o = JSON.stringify(original);
  const e = JSON.stringify(encoded);

  const stats = {
    original: {
      chars: o.length,
      bytes: byteCount(o),
      tokens: tokenCount(o),
      words: wordCount(o),
    },
    encoded: {
      chars: e.length,
      bytes: byteCount(e),
      tokens: tokenCount(e),
      words: wordCount(e),
    }
  };

  stats.comparison = {
    token_saving_percent: Number(
      (1 - stats.encoded.tokens / stats.original.tokens) * 100
    ).toFixed(2),

    byte_saving_percent: Number(
      (1 - stats.encoded.bytes / stats.original.bytes) * 100
    ).toFixed(2),

    twr_original: Number(
      stats.original.tokens / Math.max(1, stats.original.words)
    ).toFixed(3),

    twr_encoded: Number(
      stats.encoded.tokens / Math.max(1, stats.encoded.words)
    ).toFixed(3),
  };

  if (decoded !== null) {
    stats.lossless = isLossless(original, decoded);
  }

  return stats;
}

function saveStats(stats, outFile = "coil_stats.json") {
  fs.writeFileSync(outFile, JSON.stringify(stats, null, 2));
  return outFile;
}

module.exports = { analyze, saveStats };
