const {
  SessionFacade,
} = require("../facades");
const {
  UnauthenticatedException,
} = require("../exceptions");

module.exports = async function AuthenticationMiddleware(req) {
  const { context } = req;
  const { authentication, skipAuthentication } = context;
  if (!authentication && !skipAuthentication) throw new UnauthenticatedException();
  const user = await SessionFacade.getUserByAuthentication(authentication);
  if (!user && !skipAuthentication) throw new UnauthenticatedException();
  context.user = user;
};
