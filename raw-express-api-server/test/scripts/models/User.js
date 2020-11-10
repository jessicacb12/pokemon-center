const assert = require("assert");
const {
  User,
} = require("../models");
const { Generator } = require("../../utils");
const fixture = require("../../utils/fixture");

describe("SessionFacade", () => {
  describe("authenticationData()", () => {
    let user = null;
    before(async () => {
      await fixture.reload();
      user = await User.findByPk(Generator.id("user", 1));
    });
    it("should return user id, email, and hashed password", async () => {
      const result = user.authenticationData();
      assert.deepEqual(result, {
        email: user.email,
        id: user.id,
        password: user.password,
      });
    });
  });
});
