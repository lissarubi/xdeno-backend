const express = require("express");
const app = express();
const getPings = require("./getPings");
require("dotenv").config();
var cors = require("cors");

const MongoClient = require("mongodb").MongoClient;

const port = 3000;

const url = process.env.MONGO_DB_URL;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log("Connected successfully to MongoDB");
  const pingsDB = client.db("xdeno").collection("pings");

  require("dotenv").config();

  app.use(cors());

  getPings.getPings(client);

  app.get("/", (req, res) => {
    pingsDB.find().toArray((error, items) => {
      return res.send(items);
    });
  });

  app.get("/user/:user", (req, res) => {
    const user = req.params.user;

    if (user == undefined) {
      return res.send("undefined user");
    }

    pingsDB.find({ user: user }).toArray((error, items) => {
      res.send(items);
    });
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});
