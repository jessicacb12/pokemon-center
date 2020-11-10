const crypto = require("crypto");
const config = require("config");

module.exports = message => crypto.createHmac("sha256", config.app.secret).update(message).digest("hex");
