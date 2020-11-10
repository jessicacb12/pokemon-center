const Exception = require("./Exception");

module.exports = class LoginFailed extends Exception {
  constructor() {
    super("loginFailed");
  }
};
