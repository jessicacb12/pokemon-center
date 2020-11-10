const assert = require("assert");
const {
  cleanUndefined,
} = require("../../../utils");

describe("Utils: cleanUndefined", () => {
  it("01. it should filter object correctly", async () => {
    const object = {
      a: 123,
      b: 234,
      c: undefined,
      x: null,
      y: false,
    };
    assert.deepEqual(cleanUndefined(object), {
      a: 123,
      b: 234,
      x: null,
      y: false,
    });
  });
});
