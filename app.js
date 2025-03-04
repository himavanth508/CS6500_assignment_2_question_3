const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();

function randomBinary() {
  return Math.random() < 0.5 ? 0 : 1; // Randomly returns 0 or 1
}

// Query 1: Respond with data of 1024 bytes of all zeros
app.get("/zeros", (req, res) => {
  const buf = Buffer.alloc(1024, 0);
  res.send(buf);
  console.log(buf);
});

// Query 2: Respond with data of 1024 bytes of all Ones

app.get("/ones", (req, res) => {
  const buf = Buffer.alloc(1024, 1);
  res.send(buf);
  console.log(buf);
});
// Query 3: Respond with data of 1024 bytes combination of zeros and ones.

app.get("/combination", (req, res) => {
  const buf = Buffer.alloc(1024);
  buf.forEach((_, i) => (buf[i] = randomBinary()));
  res.send(buf);
  console.log(buf);
});

// TSL configuration
const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
  ciphers: "TLS_DHE_RSA_WITH_AES_256_CBC_SHA256",
  secureProtocol: "TLSv1_2_method",
};

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS server running on port 3000");
});
