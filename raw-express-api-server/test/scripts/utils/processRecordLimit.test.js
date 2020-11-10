const assert = require("assert");
const {
  processRecordLimit,
} = require("../../../utils");

describe("Utils: processRecordLimit", () => {
  describe("processRecordLimit(limit)", () => {
    it("01. 25 should return 25", async () => {
      assert.strictEqual(processRecordLimit(25), 25);
    });
    it("02. 66 should return 50", async () => {
      assert.strictEqual(processRecordLimit(66), 50);
    });
  });
});
