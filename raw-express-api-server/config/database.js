const config = require("config");

console.log("database config:");
console.log(config.database);
module.exports = config.database;
