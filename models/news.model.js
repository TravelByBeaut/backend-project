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

exports.articleDataByDate = (
  sortby = "created_at",
  orderby = "desc",
  topic_filter
) => {
  const validSorts = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrders = ["ASC", "asc", "DESC", "desc"];
  const validTopics = ["mitch", "cats"];

  let query = `SELECT articles.*, COUNT(comments.article_id) :: INTEGER AS comment_count
  FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (validTopics.includes(topic_filter)) {
    query += ` WHERE articles.topic=${topic_filter}`;
  }
  query += ` GROUP BY articles.article_id`;

  if (validSorts.includes(sortby) && validOrders.includes(orderby)) {
    query += ` ORDER BY ${sortby} ${orderby}`;
  }

  return db.query(query).then(({ rows: articles }) => {
    return articles;
  });
};

exports.commentsById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article_id doesn't exist" });
      }
      return rows[0];
    })
    .then((rows) => {
      return db
        .query(
          `SELECT * FROM comments
      WHERE article_id=$1`,
          [id]
        )
        .then(({ rows: comments }) => {
          if (comments.length === 0) {
            return Promise.reject({ status: 200, msg: "Comments not found" });
          }
          return comments;
        });
    });
};

exports.createCommentById = (id, comment, username) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article_id doesn't exist" });
      }
      return rows[0];
    })
    .then((rows) => {
      return db
        .query(
          `INSERT INTO comments (article_id, body, author) 
    VALUES ($1, $2, $3) RETURNING *;`,
          [id, comment, username]
        )
        .then(({ rows: comment }) => {
          return comment;
        });
    });
};
