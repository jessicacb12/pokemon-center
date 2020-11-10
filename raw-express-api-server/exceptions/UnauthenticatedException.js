const Exception = require("./Exception");

module.exports = class UnauthenticatedException extends Exception {
  constructor() {
    super("UnauthenticatedException");
  }
};
