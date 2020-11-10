const assert = require("assert");
const {
  jwt,
} = require("../../../utils");

describe("Utils: jwt", () => {
  it("01. it should encode and decode correctly", async () => {
    const message = {
      a: 123,
      b: 234,
    };
    const result = jwt.encode(message);
    const decoded = await jwt.decode(result);
    delete decoded.exp;
    delete decoded.iat;
    assert.deepEqual(message, decoded);
  });
});
