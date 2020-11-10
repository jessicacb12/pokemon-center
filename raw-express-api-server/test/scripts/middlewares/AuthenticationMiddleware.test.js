const assert = require("assert");
const {
  AuthenticationMiddleware,
} = require("../middlewares");
const {
  User,
} = require("../models");
const {
  fixture,
  Generator,
  defaultRequest,
  middlewarePromise,
} = require("../../utils");

describe("AuthenticationMiddleware()", () => {
  let validAuthentication = null;
  let invalidAuthentication = null;
  let targetUser = null;
  before(async () => {
    await fixture.reload();
    targetUser = await User.findByPk(Generator.id("user", "fff1"));
    validAuthentication = targetUser.authenticationData();
    invalidAuthentication = targetUser.authenticationData();
    invalidAuthentication.password = "invalid";
  });

  it("should pass if the user is validated", async () => {
    const request = defaultRequest({
      context: {
        authentication: validAuthentication,
      },
    });
    await middlewarePromise(AuthenticationMiddleware, request);
    const { user } = request.context;
    assert.strictEqual(user.id, targetUser.id);
    assert.strictEqual(user.email, targetUser.email);
    assert.strictEqual(user.password, targetUser.password);
  });

  it("should fail if the user is not valid", async () => {
    const request = defaultRequest({
      context: {
        authentication: invalidAuthentication,
      },
    });
    try {
      await middlewarePromise(AuthenticationMiddleware, request);
      assert.fail("should failed due to invalid authentication");
    } catch (err) {
      assert.strictEqual(err.type, "UnauthenticatedException");
    }
  });
});
