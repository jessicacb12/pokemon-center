module.exports = {
  app: {
    env: "production",
    port: 4001,
    secret: "secret",
    tokenDuration: 30 * 24 * 60 * 60, // 1 month
    responseShowErrorTrace: false,
    showError: true,
    maxRecordListing: 50,
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
