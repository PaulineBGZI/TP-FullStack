import pool from "../db";
import {
  getAllCookies,
  getCookie,
  createCookie,
  updateCookie,
  deleteCookie
} from "../repositories/cookies";

jest.mock("../db.js", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));


describe("Cookies Repository", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCookies returns rows", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1, cookie_name: "Test Cookie" }]
    });

    const result = await getAllCookies();

    expect(result).toHaveLength(1);
    expect(result[0].cookie_name).toBe("Test Cookie");
  });

  test("getCookie returns one cookie", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1, cookie_name: "Test Cookie" }]
    });

    const result = await getCookie("1");

    expect(result[0].id).toBe(1);
  });

  test("createCookie inserts and returns cookie", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 2, cookie_name: "New Cookie" }]
    });

    const result = await createCookie({
      pepite_id: "1",
      cookie_name: "New Cookie",
      quantity: 10,
      price: 2.5
    });

    expect(result[0].cookie_name).toBe("New Cookie");
  });

  test("updateCookie updates cookie", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1, cookie_name: "Updated Cookie" }]
    });

    const result = await updateCookie("1", {
      pepite_id: "1",
      cookie_name: "Updated Cookie",
      quantity: 20,
      price: 3
    });

    expect(result[0].cookie_name).toBe("Updated Cookie");
  });

  test("deleteCookie deletes cookie", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1 }]
    });

    const result = await deleteCookie("1");

    expect(result[0].id).toBe(1);
  });
});
