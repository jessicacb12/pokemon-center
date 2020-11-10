module.exports = function isEmpty(value) {
  if (typeof (value) === "string") {
    return value.length === 0;
  }
  if (value === undefined || value === null) return true;
  return false;
};
