const db = require("../db/connection");
const app = require("../db/app");

exports.topicData = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
    return topics;
  });
};

exports.articleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1;`, [id])
    .then(({ rows: articles }) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid address" });
      }
      return articles;
    });
};
