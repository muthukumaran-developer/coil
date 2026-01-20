const { encode } = require("./encoder");
const { decode } = require("./decoder");
const { analyze, saveStats } = require("./stats");
const { isLossless } = require("./compare");

function verify(original, encoded) {
  const decoded = decode(encoded);
  return {
    decoded,
    lossless: isLossless(original, decoded)
  };
}

module.exports = {
  encode,
  decode,

  // analytics
  stats: analyze,
  saveStats,
  isLossless,
  verify,

  // metadata
  info: () => ({
    library: "coil-js",
    version: "0.1.0",
    ecosystem: "node",
    purpose: "Token-optimized structured data encoding for LLMs"
  })
};
