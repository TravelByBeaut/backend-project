const request = require("supertest");
const app = require("../db/app");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("Topics", () => {
  describe("getTopics", () => {
    test("reponds with status: 200 and an array of topic objects", () => {
      const topics = {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      };
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { data } }) => {
          expect(data[0]).toMatchObject(topics);
        });
    });
    test("status:404 sends error message when given a valid but non-existent address", () => {
      return request(app)
        .get("/api/topicss")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid address");
        });
    });
  });
});
describe("Articles", () => {
  describe("getArticleById", () => {
    test("reponds with status: 200 and an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toHaveLength(1);
          body.article.forEach((article) => {
            expect(article.article_id).toBe(1);
            expect(article.title).toEqual(expect.any(String));
            expect(article.topic).toEqual(expect.any(String));
            expect(article.author).toEqual(expect.any(String));
            expect(article.body).toEqual(expect.any(String));
            expect(article.created_at).toEqual(expect.any(String));
            expect(article.votes).toEqual(expect.any(Number));
          });
        });
    });
    test("200 also responds with relevant info, now including comment_count", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article[0].comment_count).toEqual(expect.any(Number));
        });
    });
    test("status:404 sends error message when given a valid but non-existent address", () => {
      return request(app)
        .get("/api/articles/1500")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid address");
        });
    });
    test("status:400 sends error message when given an invalid address", () => {
      return request(app)
        .get("/api/articles/fifteen")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
  });
  describe("updateVotes", () => {
    test("status: 200 and responds with the updated votes in the article", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(200)
        .send({ inc_votes: 1 })
        .then(({ body: { article } }) => {
          expect(article.votes).toBe(101);
        });
    });
    test("status:404 sends error message when given a valid but non-existent article_id", () => {
      return request(app)
        .patch("/api/articles/20")
        .send({ inc_votes: 1 })
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid address");
        });
    });
    test("status:400 sends error message when increasing vote by a string instead of a number", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "llama" })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
  });
  describe("getArticles", () => {
    test("status: 200 and responds with array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toHaveLength(12);
          article.forEach((article) => {
            expect(article.article_id).toEqual(expect.any(Number));
            expect(article.title).toEqual(expect.any(String));
            expect(article.topic).toEqual(expect.any(String));
            expect(article.author).toEqual(expect.any(String));
            expect(article.body).toEqual(expect.any(String));
            expect(article.created_at).toEqual(expect.any(String));
            expect(article.votes).toEqual(expect.any(Number));
            expect(article.comment_count).toEqual(expect.any(Number));
          });
        });
    });
    test("status:404 sends error message when given a valid but non-existent address", () => {
      return request(app)
        .get("/api/articls")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid address");
        });
    });
  });
});
describe("Users", () => {
  describe("getUsers", () => {
    test("status: 200 and responds with array of objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { data } }) => {
          expect(data).toHaveLength(4);
          data.forEach((user) => {
            expect(user.username).toEqual(expect.any(String));
            expect(user.name).toEqual(expect.any(String));
            expect(user.avatar_url).toEqual(expect.any(String));
          });
        });
    });
    test("status:404 sends error message when given a valid but non-existent address", () => {
      return request(app)
        .get("/api/user")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid address");
        });
    });
  });
});
describe("Comments", () => {
  describe("getCommentsById", () => {
    test("status: 200 and resonds with an array of comments objects relating to the article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          comments.forEach((comment) => {
            expect(comment.comment_id).toEqual(expect.any(Number));
            expect(comment.author).toEqual(expect.any(String));
            expect(comment.body).toEqual(expect.any(String));
            expect(comment.created_at).toEqual(expect.any(String));
            expect(comment.votes).toEqual(expect.any(Number));
          });
        });
    });
    test("status: 200 and empty array when article_id exists but no comments available", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toEqual("Comments not found");
        });
    });
    test("status: 400 when given an invalid address", () => {
      return request(app)
        .get("/api/articles/one/comments")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
    test("status: 404 when given an valid address but no data", () => {
      return request(app)
        .get("/api/articles/100/comments")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Article_id doesn't exist");
        });
    });
  });
});
