module.exports = function cleanUndefined(object) {
  const keys = Object.keys(object);
  const result = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
  }
  return result;
};
