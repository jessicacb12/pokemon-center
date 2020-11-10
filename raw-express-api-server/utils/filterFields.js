module.exports = function filterFields(object, fields = []) {
  let result = null;
  if (Array.isArray(object)) {
    result = [];
    for (let i = 0; i < object.length; i += 1) {
      result.push(realFilter(object[i], fields));
    }
  } else result = realFilter(object, fields);
  return result;
};

function realFilter(object, fields) {
  const result = {};
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    result[field] = object[field];
  }
  return result;
}
