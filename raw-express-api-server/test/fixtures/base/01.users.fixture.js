const Generator = require("../../utils/Generator");

const data = new Generator();
data.addUser("fff1", "test-admin", {
  rawPassword: "admin",
  role: "admin",
});
data.addUser("fff2", "test-user", {
  rawPassword: "user",
});

module.exports = data.records;
