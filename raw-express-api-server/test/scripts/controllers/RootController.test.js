const assert = require("assert");
const {
  Requester,
} = require("../../utils");

const requester = new Requester();

describe("Route: /", () => {
  describe("/info", () => {
    it("should get info", async () => {
      const result = await requester.get("/info");
      assert.deepEqual(result.body, {
        status: "ok",
      });
    });
  });
});
