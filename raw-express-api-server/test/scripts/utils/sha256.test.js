const assert = require("assert");
const {
  sha256,
} = require("../../../utils");

describe("Utils: sha256", () => {
  describe("sha256()", () => {
    it("01. digest1", async () => {
      const message = "abcd1234";
      const result = sha256(message);
      const expectation = "5546bb49edb41003c548bc411ed8016a826c8c126bc057a2974c19c8a0eed9ce";
      assert.strictEqual(result, expectation);
    });
  });
});
