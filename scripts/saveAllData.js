require("dotenv").config();
fs = require('fs');
const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGO_DB_URL;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {

  const pingsDB = client.db("xdeno").collection("pings");

  let data = "canal,pessoa,data\n"

  foo = pingsDB.find().toArray((error, items) => {
    items.forEach((ping) => {
      data += ping.channel + "," + ping.user + "," + ping.date + "\n"
    })
    console.log(data)

    const dateToday = new Date()
    const filename = dateToday.getDate() + "|" + dateToday.getMonth() + "|" + dateToday.getFullYear() + ".csv"
    fs.writeFileSync(filename, data);
    process.exit()
  });


})

