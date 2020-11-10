const fs = require("fs");
const config = require("config");
const path = require("path");
const Sequelize = require("sequelize");

const databaseConfig = config.database;
const db = {};
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig,
);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
