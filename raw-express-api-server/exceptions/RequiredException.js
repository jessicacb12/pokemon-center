const Exception = require("./Exception");

module.exports = class RequiredException extends Exception {
  constructor(value) {
    super("RequiredException", { value });
  }

  static check(fieldName, value) {
    if (value === undefined || value === null) throw new RequiredException(fieldName);
  }
};
