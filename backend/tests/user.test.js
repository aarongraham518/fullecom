const request = require("supertest");
const app = require("../server");  // Import your Express app

describe("GET /api/users", () => {
  it("should fetch all users", async () => {
    const response = await request(app).get("/api/users");

    // Check the status code and structure of the response
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);  // Assuming the response is an array of users
    expect(response.body.length).toBeGreaterThan(0); // Assuming there are users in the DB
  });
});
