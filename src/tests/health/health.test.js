const app = require('../../app');
const supertest = require('supertest');
test("GET /", async () => {
     
    await supertest(app).get("/")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(response.body).toBeInstanceOf(Object);
        
        let res = response.body;
        let keys = Object.keys(res);
        // Check data
        expect(keys).toContain("message");
        expect(res.message).toBe("🦄🌈✨👋🌎🌍🌏✨🌈🦄");
      });
  });
  