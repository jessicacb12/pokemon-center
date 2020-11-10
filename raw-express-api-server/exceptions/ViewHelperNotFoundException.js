const Exception = require("./Exception");

module.exports = class ViewHelperNotFoundException extends Exception {
  constructor(name) {
    super("viewHelperNotFound", {
      name,
    });
  }
};
