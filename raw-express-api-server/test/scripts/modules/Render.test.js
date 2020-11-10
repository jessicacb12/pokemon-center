const assert = require("assert");
const {
  Render,
} = require("../../../modules");
const {
  testViewHelpers,
  testViews,
} = require("../../assets");

const renderer = new Render(testViews, testViewHelpers);

function render(viewName, data) {
  return renderer.render(viewName, data);
}

describe("Render", () => {
  it("should be able to render object correctly", () => {
    const result = render("test1", {
      a: 123,
    });
    assert.deepEqual(result, {
      a: 123,
      b: "formattedundefined",
      c: undefined,
    });
  });
  it("should be able to render array correctly", () => {
    const result = render("test1", [{
      a: 123,
    }, {
      a: 123,
    }]);
    assert.deepEqual(result, [{
      a: 123,
      b: "formattedundefined",
      c: undefined,
    }, {
      a: 123,
      b: "formattedundefined",
      c: undefined,
    }]);
  });
  it("should be able to render nested object correctly", () => {
    const result = render("test1", {
      a: 123,
      b: 444,
      c: {
        f: 1234,
        e: 123,
      },
    });
    assert.deepEqual(result, {
      a: 123,
      b: "formatted444",
      c: {
        d: undefined,
        e: 123,
      },
    });
  });
  it("should be able to render nested array correctly", () => {
    const result = render("test1", {
      a: 123,
      b: 444,
      c: [{
        f: 1234,
        e: 123,
      }, {
        d: 1234,
        e: 123,
      }],
    });
    assert.deepEqual(result, {
      a: 123,
      b: "formatted444",
      c: [{
        d: undefined,
        e: 123,
      }, {
        d: 1234,
        e: 123,
      }],
    });
  });
});
