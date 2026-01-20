const express = require("express");
const { encode, decode } = require("../src");

const app = express();
app.use(express.json());

app.post("/encode", (req,res)=>{
  res.json(encode(req.body));
});

app.post("/decode", (req,res)=>{
  res.json(decode(req.body));
});

app.listen(3000, ()=>console.log("COIL API running"));
