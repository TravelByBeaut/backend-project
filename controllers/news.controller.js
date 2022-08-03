const {
  topicData,
  articleById,
  changeVote,
  userData,
  articleData,
} = require("../models/news.model");

exports.getTopics = (req, res, next) => {
  topicData().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getArticleById = (req, res, next) => {
  articleById(req.params.article_id)
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

exports.getUsers = (req, res, next) => {
  userData().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getArticles = (req, res, next) => {
  articleData()
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
