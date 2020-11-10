const Exception = require("./Exception");

module.exports = class UnauthorizedException extends Exception {
  constructor(access, message) {
    super("UnauthorizedException", { access, message });
  }
};
