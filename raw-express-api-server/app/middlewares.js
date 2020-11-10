const {
  ContextMiddleware,
  TokenVerificationMiddleware,
  AuthenticationMiddleware,
  AuthenticationExclusionMiddleware,
} = require("../middlewares");

module.exports = function middlewares(app) {
  app.use(ContextMiddleware);
  app.use("/login", AuthenticationExclusionMiddleware);
  app.use("/info", AuthenticationExclusionMiddleware);
  app.use(TokenVerificationMiddleware);
  //app.use(AuthenticationMiddleware);
};
