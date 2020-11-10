const {
  jwt,
} = require("../utils");
const {
  InvalidTokenException,
} = require("../exceptions");

const USER_AUTH_KEY = "user-token";

module.exports = async function TokenVerificationMiddleware(req) {
  const { headers } = req;
  const { cookies } = req;
  const { query } = req;
  const { context } = req;
  const authentication = query.auth || headers[USER_AUTH_KEY] || headers.authorization || cookies[USER_AUTH_KEY];
  delete query.auth;
  if (authentication) {
    try {
      const result = await jwt.decode(authentication);
      context.authentication = result;
    } catch (err) {
      throw new InvalidTokenException();
    }
  }
};
