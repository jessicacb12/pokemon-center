require("dotenv").config();
const config = require("config");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const middlewares = require("./app/middlewares");
const mainRouter = require("./app/mainRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

middlewares(app);
app.use("/", mainRouter.router);

app.use((err, req, res, next) => {
  res.status(500);
  const errorJSON = {
    type: err.type,
    detail: err.detail,
  };
  if (config.app.responseShowErrorTrace) {
    errorJSON.trace = err.stackArray;
  }
  if (config.app.showError) {
    console.error(err);
  }
  res.json(errorJSON);
  next();
});
module.exports = app;
