import request from "supertest";
import express from "express";
import router from "../routes/cookies";

import * as repository from "../repositories/cookies";

jest.mock("../repositories/cookies");

const app = express();
app.use(express.json());
app.use("/cookies", router);

describe("Cookies Routes", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /cookies returns 200", async () => {
    (repository.getAllCookies as jest.Mock).mockResolvedValue([
      { id: 1, cookie_name: "Test" }
    ]);

    const res = await request(app).get("/cookies");

    expect(res.status).toBe(200);
    expect(res.body[0].cookie_name).toBe("Test");
  });

  test("GET /cookies/:id returns 404 if not found", async () => {
    (repository.getCookie as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get("/cookies/99");

    expect(res.status).toBe(404);
  });

  test("POST /cookies creates cookie", async () => {
    (repository.createCookie as jest.Mock).mockResolvedValue([
      { id: 2, cookie_name: "New Cookie" }
    ]);

    const res = await request(app)
      .post("/cookies")
      .send({
        pepite_id: 1,
        cookie_name: "New Cookie",
        quantity: 10,
        price: 2.5
      });

    expect(res.status).toBe(201);
    expect(res.body.cookie_name).toBe("New Cookie");
  });

  test("PUT /cookies/:id returns 404 if not found", async () => {
    (repository.updateCookie as jest.Mock).mockResolvedValue([]);

    const res = await request(app)
      .put("/cookies/99")
      .send({
        pepite_id: 1,
        cookie_name: "Updated",
        quantity: 5,
        price: 2
      });

    expect(res.status).toBe(404);
  });

  test("DELETE /cookies/:id returns deleted cookie", async () => {
    (repository.deleteCookie as jest.Mock).mockResolvedValue([
      { id: 1 }
    ]);

    const res = await request(app).delete("/cookies/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

});
