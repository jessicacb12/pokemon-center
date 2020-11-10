const assert = require("assert");
const {
  ContextMiddleware,
} = require("../middlewares");
const {
  middlewarePromise,
} = require("../../utils");

describe("ContextMiddleware()", () => {
  it("should create context object in request", async () => {
    const request = {};
    await middlewarePromise(ContextMiddleware, request);
    assert.deepEqual(request, { context: {} });
  });
});
