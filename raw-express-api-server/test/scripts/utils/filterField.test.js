const assert = require("assert");
const {
  filterFields,
} = require("../../../utils");

describe("Utils: filterFields", () => {
  it("01. it should filter object correctly", async () => {
    const object = {
      a: 123,
      b: 234,
    };
    assert.deepEqual(filterFields(object, ["a", "c"]), {
      a: 123,
      c: undefined,
    });
  });
  it("01. it should filter array correctly", async () => {
    const object = [{
      a: 123,
      b: 234,
    }, {
      b: 123,
      c: 234,
    }];
    assert.deepEqual(filterFields(object, ["a", "c"]), [{
      a: 123,
      c: undefined,
    }, {
      a: undefined,
      c: 234,
    }]);
  });
});
