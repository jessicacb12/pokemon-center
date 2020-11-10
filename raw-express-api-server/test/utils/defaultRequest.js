module.exports = function defaultRequest(extensions = {}) {
  return {
    context: {},
    headers: {},
    body: {},
    cookies: {},
    query: {},
    ...extensions,
  };
};
