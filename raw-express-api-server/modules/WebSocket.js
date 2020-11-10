const {
  InvalidTypeException,
} = require("../exceptions");

const userSocketIndex = {};

module.exports = {
  register,
  userSocketIndex,
  sendByUsers,
};

function register(socket, user) {
  const userId = user.id;
  userSocketIndex[userId] = userSocketIndex[userId] || [];

  userSocketIndex[userId].push(socket);
  socket.onmessage = function onmessage() {
    // try {
    //   const data = JSON.parse(event.data);
    // } catch (ex) {
    //   log('unhandled message format', event.data);
    // }
  };
  socket.onclose = function onclose() {
    const userSockets = userSocketIndex[userId];
    for (let i = 0; i < userSockets.length; i += 1) {
      if (userSockets[i] === socket) {
        return userSockets.splice(i, 1);
      }
    }
    return null;
  };
}

function sendByUsers(userIds, data = {}) {
  if (typeof (data) !== "object") {
    throw new InvalidTypeException("data", "object");
  }
  for (let i = 0; i < userIds.length; i += 1) {
    const userSockets = userSocketIndex[userIds] || [];
    for (let j = 0; j < userSockets.length; i += 1) {
      userSockets[j].send(JSON.stringify(data));
    }
  }
}
