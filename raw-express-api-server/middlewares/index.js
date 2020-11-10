const AuthenticationMiddleware = require("./AuthenticationMiddleware");
const ContextMiddleware = require("./ContextMiddleware");
const TokenVerificationMiddleware = require("./TokenVerificationMiddleware");
const AuthenticationExclusionMiddleware = require("./AuthenticationExclusionMiddleware");
const {
  wrapAsyncRequest,
} = require("../utils");

const middlewares = {
  TokenVerificationMiddleware,
  ContextMiddleware,
  AuthenticationMiddleware,
  AuthenticationExclusionMiddleware,
};

const wrappedMiddlewares = {};
const middlewareEntries = Object.entries(middlewares);
for (let i = 0; i < middlewareEntries.length; i += 1) {
  const middlewareName = middlewareEntries[i][0];
  const middlewareHandler = middlewareEntries[i][1];
  wrappedMiddlewares[middlewareName] = wrapAsyncRequest(middlewareHandler, true);
}

module.exports = wrappedMiddlewares;
