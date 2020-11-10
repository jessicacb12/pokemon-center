const Exception = require("./Exception");

module.exports = class NotFoundException extends Exception {
  constructor(id, dataType) {
    super("notFound", { id, dataType });
  }
};
