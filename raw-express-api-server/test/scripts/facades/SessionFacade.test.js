const assert = require("assert");
const {
  SessionFacade,
} = require("../facades");
const {
  User,
} = require("../models");
const {
  jwt,
} = require("../utils");
const Generator = require("../../utils/Generator");
const fixture = require("../../utils/fixture");

describe("SessionFacade", () => {
  describe("getUserByAuthentication()", () => {
    before(async () => {
      await fixture.reload();
    });
    it("should return user if id, email, and hashed password match", async () => {
      const result = await SessionFacade.getUserByAuthentication({
        id: Generator.id("user", "fff1"),
        email: "test-admin@email.system",
        password: "1fd849baf9cc24c3c13f83005d8c2072c844e426458480e8e9d47aea721a748c",
      });
      const expectedUser = await User.findByPk(Generator.id("user", "fff1"));
      assert.deepStrictEqual(result.toJSON(), expectedUser.toJSON());
    });
    it("should return null if id didn't match", async () => {
      const result = await SessionFacade.getUserByAuthentication({
        id: Generator.id("user", 2),
        email: "test-admin@email.system",
        password: "abcd1234",
      });
      assert.strictEqual(result, null);
    });
    it("should return null if email didn't match", async () => {
      const result = await SessionFacade.getUserByAuthentication({
        id: Generator.id("user", 1),
        email: "test-admin2@email.system",
        password: "abcd1234",
      });
      assert.strictEqual(result, null);
    });
    it("should return null if hashed password didn't match", async () => {
      const result = await SessionFacade.getUserByAuthentication({
        id: Generator.id("user", 1),
        email: "test-admin@email.system",
        password: "abcd1234",
      });
      assert.strictEqual(result, null);
    });
  });
  describe("login", () => {
    it("should be able to login correctly", async () => {
      const result = await SessionFacade.login("test-user@email.system", "user");
      assert(result.token);
      const decodedToken = jwt.decode(result.token);
      const expectedUser = await User.findOne({
        where: {
          email: "test-user@email.system",
        },
      });
      assert.strictEqual(decodedToken.id, expectedUser.id);
      assert.strictEqual(decodedToken.email, expectedUser.email);
      assert.strictEqual(decodedToken.password, expectedUser.password);
    });
    it("should fail if credentials wrong", async () => {
      try {
        await SessionFacade.login("test-user@email.system", "user-wrong");
        assert.fail();
      } catch (err) {
        assert.strictEqual(err.type, "loginFailed");
      }
    });
  });
});
