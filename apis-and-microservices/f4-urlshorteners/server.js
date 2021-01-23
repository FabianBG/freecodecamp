require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const storage = require("./storage");

function isUrlValid(userInput) {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/shorturl/:url", function (req, res) {
  console.log(req.params);
  const { url } = req.params;

  const redirect = storage.get(url);
  console.log(redirect);

  res.redirect(redirect);
});

app.post("/api/shorturl/new", function (req, res) {
  console.log(req.body.url);
  const { url } = req.body;

  if (!isUrlValid(url)) res.send({ error: "invalid url" });

  const id = new Date().getTime().toString(24);

  storage.insert(id, url);

  res.send({
    original_url: url,
    short_url: id,
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
