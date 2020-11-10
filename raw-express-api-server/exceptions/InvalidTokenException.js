const Exception = require("./Exception");

module.exports = class InvalidTokenException extends Exception {
  constructor() {
    super("invalidToken");
  }
};
