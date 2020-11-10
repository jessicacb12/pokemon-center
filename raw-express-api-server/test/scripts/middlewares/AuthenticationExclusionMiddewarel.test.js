const assert = require("assert");
const {
  AuthenticationExclusionMiddleware,
} = require("../middlewares");
const {
  middlewarePromise,
} = require("../../utils");

describe("AuthenticationExclusionMiddleware()", () => {
  it("should create context object in request", async () => {
    const request = { context: {} };
    await middlewarePromise(AuthenticationExclusionMiddleware, request);
    assert.deepEqual(request, { context: { skipAuthentication: true } });
  });
});
