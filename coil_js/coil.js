#!/usr/bin/env node
const fs = require("fs");
const { encode, decode } = require("../src");

const [,, cmd, input, out="out.json"] = process.argv;
const data = JSON.parse(fs.readFileSync(input));

if (cmd === "encode") {
  fs.writeFileSync(out, JSON.stringify(encode(data), null, 2));
}

if (cmd === "decode") {
  fs.writeFileSync(out, JSON.stringify(decode(data), null, 2));
}
