module.exports = function serializeQuery(queryObject = {}) {
  const strings = [];
  const properties = Object.entries(queryObject);
  for (let i = 0; i < properties.length; i += 1) {
    const propertyName = properties[i][0];
    const propertyValue = properties[i][1];
    strings.push(`${encodeURIComponent(propertyName)}=${encodeURIComponent(propertyValue)}`);
  }
  let stringQuery = strings.join("&") || "";
  if (stringQuery.length > 0) stringQuery = `?${stringQuery}`;
  return stringQuery;
};
