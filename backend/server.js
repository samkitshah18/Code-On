// libs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import request from "request";

import CodeScript from "./codeDB.js";

// constants
const app = express();
const port = 9000;

// middle wares
app.use(express.json());
app.use(cors());

// db connection
const uri =
  "mongodb+srv://yashpatel:yashpatel@cluster0.ldd4e.mongodb.net/code?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// end-points
// @get all the code files
app.get("/", async (req, res) => {
  CodeScript.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// @execute code file
app.post("/executeIt", async (req, res) => {
  const { code, input, lang } = req.body;
  console.log({ code, input, lang });
  const program_file = {
    script: code,
    language: lang,
    stdin: input,
    versionIndex: "0",
    clientId: "fb39fa354d3342fc8a2ba9f6c0391c56",
    clientSecret:
      "5aa05d3f94aa58b86894e2f11ba91fc6c43625033d2266008ac4fd3dc9f7a627",
  };

  await request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program_file,
    },
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      res.status(201).send(body);
    }
  );
});

// listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
