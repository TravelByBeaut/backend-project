const { topicData, articleById } = require("../models/news.model");

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
