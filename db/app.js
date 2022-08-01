const express = require("express");
const { getTopics, getArticleById } = require("./controllers/news.controller");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid address" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if ((err.code = "22P02")) {
    res.status(400).send({ msg: "Bad request" });
  }
});

module.exports = app;
