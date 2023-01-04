// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// the date endpoint
app.get("/api/:date?", function (req, res) {
  const dateStr = req.params.date;
  let date = isNaN(Number(dateStr))
    ? new Date(dateStr)
    : new Date(Number(dateStr));
  if (dateStr === undefined) {
    date = new Date();
  }
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toUTCString();
  res.json({ unix: date.getTime(), utc: utcDate });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
