const db = require("../db/connection");
const app = require("../db/app");

exports.topicData = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
    return topics;
  });
};

exports.articleById = (id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) :: INTEGER AS comment_count 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id;`,
      [id]
    )
    .then(({ rows: articles }) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid address" });
      }
      return articles;
    });
};

exports.changeVote = (id, num) => {
  return db
    .query(
      `UPDATE articles SET votes=(votes+$2) WHERE article_id=$1 RETURNING *;`,
      [id, num]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid address" });
      }
      return rows[0];
    });
};

exports.userData = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    return users;
  });
};

exports.articleDataByDate = () => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) :: INTEGER AS comment_count 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id=comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at desc;`
    )
    .then(({ rows: article }) => {
      return article;
    });
};
