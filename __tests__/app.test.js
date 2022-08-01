const request = require("supertest");
const app = require("../db/app");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const getTopics = require("../db/controllers/news.controller");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));

afterAll(() => db.end());

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
describe("getArticleById", () => {
  test("reponds with status: 200 and an article object", () => {
    const id = 1;
    const articles = {
      article_id: id,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
    };
    return request(app)
      .get(`/api/articles/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0]).toEqual(articles);
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
