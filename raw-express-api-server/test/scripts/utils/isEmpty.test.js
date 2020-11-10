const assert = require("assert");
const {
  isEmpty,
} = require("../../../utils");

describe("Utils: isEmpty", () => {
  it("01. undefined should be empty", async () => {
    assert.strictEqual(isEmpty(undefined), true);
  });
  it("02. null should be empty", async () => {
    assert.strictEqual(isEmpty(null), true);
  });
  it("03. '' should be empty", async () => {
    assert.strictEqual(isEmpty(""), true);
  });
  it("04. 0 should be not empty", async () => {
    assert.strictEqual(isEmpty(0), false);
  });
  it("05. 'test' should be empty", async () => {
    assert.strictEqual(isEmpty("test"), false);
  });
});
