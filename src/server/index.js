const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

const { analyze } = require("./analyze.js");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.render("index.html");
});

const key = process.env.API_KEY;

app.post("/", async (req, res) => {
  const url = req.body.input;
  const Analyze = await analyze(url, key);
  const { code, msg, sample } = Analyze;
  if (code == 100 || code == 212) {
    return res.send({ msg: msg, code: code });
  }
  return res.send({ sample: sample, code: code });
});

const PORT = 8000;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
