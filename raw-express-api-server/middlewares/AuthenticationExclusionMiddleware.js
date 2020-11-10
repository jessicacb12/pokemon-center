
module.exports = async function AuthenticationMiddleware(req) {
  const { context } = req;
  context.skipAuthentication = true;
};
