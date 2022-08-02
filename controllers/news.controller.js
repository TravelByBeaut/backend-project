const { topicData, articleById, changeVote } = require("../models/news.model");

exports.getTopics = (req, res, next) => {
  topicData().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getArticleById = (req, res, next) => {
  return articleById(req.params.article_id)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateVotes = (req, res, next) => {
  changeVote(req.params.article_id, req.body.inc_votes)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
