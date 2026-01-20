const fs = require("fs");

const ESC = "\\";
const PAIR = ",";
const REC = "|";

function esc(v) {
  return v
    .replaceAll(ESC, ESC + ESC)
    .replaceAll(PAIR, ESC + PAIR)
    .replaceAll(REC, ESC + REC)
    .replaceAll(":", ESC + ":");
}

function unesc(v) {
  let out = "";
  for (let i = 0; i < v.length; i++) {
    if (v[i] === ESC && i + 1 < v.length) {
      out += v[i + 1];
      i++;
    } else out += v[i];
  }
  return out;
}

function tokenCount(str) {
  return Math.max(1, Math.ceil(str.length / 4)); // same heuristic as stats.py
}

module.exports = { ESC, PAIR, REC, esc, unesc, tokenCount };
