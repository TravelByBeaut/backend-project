const express = require("express");
const { getTopics } = require("./controllers/news.controller");

const app = express();

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid address" });
});

module.exports = app;
