const assert = require("assert");
const {
  TokenVerificationMiddleware,
} = require("../middlewares");
const {
  jwt,
} = require("../utils");
const {
  defaultRequest,
  middlewarePromise,
} = require("../../utils");

describe("TokenVerificationMiddleware()", () => {
  const tokenContent = { mesage: "valid" };
  const validUserToken = jwt.encode(tokenContent);
  const invalidUserToken = `${validUserToken}invalid`;
  const decodedTokenContent = jwt.decode(validUserToken);

  it("should should take user-token from header", async () => {
    const request = defaultRequest({
      headers: {
        "user-token": validUserToken,
      },
    });
    await middlewarePromise(TokenVerificationMiddleware, request);
    assert.deepEqual(request.context.authentication, decodedTokenContent);
  });
  it("should should take user-token from header 2", async () => {
    const request = defaultRequest({
      headers: {
        authorization: validUserToken,
      },
    });
    await middlewarePromise(TokenVerificationMiddleware, request);
    assert.deepEqual(request.context.authentication, decodedTokenContent);
  });
  it("should should take user-token from cookies", async () => {
    const request = defaultRequest({
      cookies: {
        "user-token": validUserToken,
      },
    });
    await middlewarePromise(TokenVerificationMiddleware, request);
    assert.deepEqual(request.context.authentication, decodedTokenContent);
  });
  it("should should take user-token from query", async () => {
    const request = defaultRequest({
      query: {
        auth: validUserToken,
      },
    });
    await middlewarePromise(TokenVerificationMiddleware, request);
    assert.deepEqual(request.context.authentication, decodedTokenContent);
  });
  it("should error if token is invalid", async () => {
    try {
      const request = defaultRequest({
        headers: {
          "user-token": invalidUserToken,
        },
      });
      await middlewarePromise(TokenVerificationMiddleware, request);
      assert.fail("should fail if token is invalid");
    } catch (error) {
      assert.strictEqual(error.type, "invalidToken");
    }
  });
});
