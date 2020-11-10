const config = require("config");
const jwt = require("jsonwebtoken");

const {
  secret,
  tokenDuration,
} = config.app;

module.exports = {
  encode,
  decode,
};

function encode(json, options = {}) {
  options.expiresIn = tokenDuration;
  return jwt.sign(json, secret, options);
}

function decode(token) {
  return jwt.verify(token, secret);
}
