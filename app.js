const cors = require("cors");

const express = require("express");

const {
  getTopics,
  getArticleById,
  updateVotes,
  getUsers,
  getArticles,
  getCommentsById,
  sendCommentById,
  removeCommentById,
  allEndpoints,
} = require("./controllers/news.controller");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", updateVotes);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsById);
app.post("/api/articles/:article_id/comments", sendCommentById);
app.delete("/api/comments/:comment_id", removeCommentById);
app.get("/api", allEndpoints);

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
