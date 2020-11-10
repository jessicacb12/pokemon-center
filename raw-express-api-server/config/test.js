module.exports = {
  app: {
    tokenDuration: 30 * 24 * 60 * 60, // 1 month
  },
  database: {
    username: "root",
    password: "",
    database: "pokecenter",
    host: "localhost",
    // port: 80,
    dialect: "mysql",
    logging: false,
  },
};
