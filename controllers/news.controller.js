const {
  topicData,
  articleById,
  changeVote,
  userData,
  articleDataByDate,
  commentsById,
  createCommentById,
  deleteCommentById,
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
  articleDataByDate(req.query.sort_by, req.query.order_by, req.query.topic)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsById = (req, res, next) => {
  commentsById(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendCommentById = (req, res, next) => {
  createCommentById(req.params.article_id, req.body.body, req.body.username)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeCommentById = (req, res, next) => {
  deleteCommentById(req.params.comment_id)
    .then(() => {
      res.send(204);
    })
    .catch((err) => {
      next(err);
    });
};
