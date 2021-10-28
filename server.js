const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cors = require("cors");
const app = express();
const localStorage = "./messages.json";

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// POST
app.post("/message", async function (req, res) {
  try {
    let incomingData = {
      from: req.header("x-forwarded-for"),
      to: req.body.to,
      message: req.body.message,
    };
    console.log(incomingData);
    await fs.ensureFile(localStorage);
    let text = await fs.readFile(localStorage);
    let savedMessages = [];
    if (text != "") {
      savedMessages = JSON.parse(text);
    }
    savedMessages.push(incomingData);
    await fs.writeFile(localStorage, JSON.stringify(savedMessages, null, 4));
    res.status(200).send("saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//GET
app.get("/message", async function (req, res) {
  try {
    let recipient = req.header("x-forwarded-for");
    console.log(`ip address : ${recipient} requested their messages`); //!!!!!
    await fs.ensureFile(localStorage);
    let text = await fs.readFile(localStorage);
    let savedMessages = [];
    if (text != "") {
      savedMessages = JSON.parse(text);
    }

    let filtered = savedMessages.filter((message) => message.to == recipient);
    res.status(200).json(
      filtered.map((message) => {
        return {
          from: message.from,
          message: message.message,
        };
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// initiating server
var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app is listening at http://%s:%s", host, port);
});
