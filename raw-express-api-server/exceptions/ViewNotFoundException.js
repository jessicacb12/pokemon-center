const Exception = require("./Exception");

module.exports = class ViewNotFoundException extends Exception {
  constructor(name) {
    super("viewNotFound", {
      name,
    });
  }
};
