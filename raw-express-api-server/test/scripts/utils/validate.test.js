const assert = require("assert");
const {
  validate,
} = require("../../../utils");

describe("Utils: validate", () => {
  describe("validate.required(object,fieldName)", () => {
    it("01. should be ok if exists", async () => {
      const object = {
        a: 123,
      };
      validate.required(object, "a");
    });
    it("02. should throw error if missing", async () => {
      try {
        const object = {};
        validate.required(object, "a");
        assert.fail();
      } catch (err) {
        assert.equal(err.type, "RequiredException");
        assert.deepEqual(err.detail, {
          value: "a",
        });
      }
    });
    it("02. should throw error if object empty", async () => {
      try {
        const object = undefined;
        validate.required(object, "a");
        assert.fail();
      } catch (err) {
        assert.equal(err.type, "RequiredException");
        assert.deepEqual(err.detail, {
          value: "a",
        });
      }
    });
  });
});
