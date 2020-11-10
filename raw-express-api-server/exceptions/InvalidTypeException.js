const Exception = require("./Exception");

module.exports = class InvalidTypeException extends Exception {
  constructor(name, type) {
    super("invalidType", {
      name,
      type,
    });
  }
};
