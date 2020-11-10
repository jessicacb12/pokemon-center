module.exports = function normalizeUrl(...paths) {
  let result = paths[0] || "/";
  for (let i = 1; i < paths.length; i += 1) {
    result += `/${paths[i]}`;
  }
  result = result.replace(/([^:]\/)\/+/g, "$1");
  if (result.startsWith("/")) { result = result.replace(/\/\//g, "/"); }
  return result;
};
