const { jwt, sha256 } = require("../../utils");
const Generator = require("./Generator");

const adminToken = jwt.encode({
  id: Generator.id("user", "fff1"),
  password: sha256("admin"),
  email: "test-admin@email.system",
});
const userToken = jwt.encode({
  id: Generator.id("user", "fff2"),
  password: sha256("user"),
  email: "test-user@email.system",
});
module.exports = {
  adminToken,
  userToken,
};
