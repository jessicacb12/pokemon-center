const isEmpty = require("./isEmpty");
const {
  RequiredException,
} = require("../exceptions");

module.exports = {
  required,
};

function required(object, fieldName) {
  if (!object) throw new RequiredException(fieldName);
  if (isEmpty(object[fieldName])) throw new RequiredException(fieldName);
}
