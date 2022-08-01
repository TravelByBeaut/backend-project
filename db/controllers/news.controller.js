const { topicData } = require("../models/news.model");

exports.getTopics = (req, res, next) => {
  return topicData()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Bad request" });
      next(err);
    });
};
