const assert = require("assert");
const {
  serializeQuery,
} = require("../../../utils");

describe("Utils: serializeQuery", () => {
  it("01. null return ''", () => {
    assert.strictEqual(serializeQuery(), "");
  });
  it("02. {} return ''", () => {
    assert.strictEqual(serializeQuery({}), "");
  });
  it("03. simple serialize", () => {
    assert.strictEqual(serializeQuery({ a: 123 }), "?a=123");
  });
});
