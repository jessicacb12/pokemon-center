const Exception = require("./Exception");

module.exports = class UnimplementedException extends Exception {
  constructor(message) {
    super("UnimplementedException", { message });
  }
};
