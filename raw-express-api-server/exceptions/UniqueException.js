const Exception = require("./Exception");

module.exports = class UniqueException extends Exception {
  constructor(name, value) {
    super("unique", {
      name,
      value,
    });
  }
};
