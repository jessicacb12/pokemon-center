const assert = require("assert");
const {
  normalizeUrl,
} = require("../utils");

describe("normalizeUrl", () => {
  it("1. normalize single url", () => {
    const url = "/some/sample/url";
    const result = "/some/sample/url";
    assert.strictEqual(normalizeUrl(url), result);
  });
  it("2. normalize single url with multiple ///", () => {
    const url = "///some//sample/url";
    const result = "/some/sample/url";
    assert.strictEqual(normalizeUrl(url), result);
  });
});
