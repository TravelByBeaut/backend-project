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
      .get("/api/topics/news")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid address");
      });
  });
});
