const assert = require("assert");
const {
  Requester,
  fixture,
} = require("../../utils");


const requester = new Requester();

describe("Route (Session): /", () => {
  before(async () => {
    await fixture.reload();
  });
  describe("/login", () => {
    it("should be able to login normally", async () => {
      const result = await requester.post("/login", {
        email: "test-user@email.system",
        password: "user",
      });
      assert.strictEqual(result.status, 200);
      assert(result.body.token);
    });
    it("should be able to get error correctly", async () => {
      const result = await requester.post("/login", {
        email: "test-user@email.system",
        password: "user-wrong",
      });
      assert.strictEqual(result.status, 500);
      assert.strictEqual(result.body.type, "loginFailed");
    });
  });
});
