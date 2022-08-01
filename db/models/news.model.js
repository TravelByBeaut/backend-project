const db = require("../connection");
const app = require("../app");

exports.topicData = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
    return topics;
  });
};
