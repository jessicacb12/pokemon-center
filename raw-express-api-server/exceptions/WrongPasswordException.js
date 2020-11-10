const Exception = require("./Exception");

module.exports = class WrongPassword extends Exception {
  constructor() {
    super("wrongPassword");
  }
};
