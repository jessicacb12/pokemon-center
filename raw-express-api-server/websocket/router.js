const expressWs = require("express-ws");
const {
  SessionFacade,
} = require("../facades");
const {
  jwt,
} = require("../utils");
const {
  WebSocket,
} = require("../modules");

module.exports = function webSocketRouter(app) {
  expressWs(app);

  app.ws("/websocket", async (ws, req, res, next) => {
    const { cookies } = req;
    const { token } = cookies;
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        const user = SessionFacade.getUserByAuthentication(decodedToken);
        WebSocket.register(ws, user);
      } catch (err) {
        next(err);
      }
    }
  });
};
