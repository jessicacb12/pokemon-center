const express = require("express");
const wrapAsyncRequest = require("../utils/wrapAsyncRequest");

module.exports = class Router {
  constructor() {
    this.router = express.Router();
  }

  get(path, handler) {
    this.route("get", path, handler);
  }

  post(path, handler) {
    this.route("post", path, handler);
  }

  put(path, handler) {
    this.route("put", path, handler);
  }

  delete(path, handler) {
    this.route("delete", path, handler);
  }

  route(method, path, handler) {
    this.router[method](path, wrapAsyncRequest(handler));
  }

  rest(path, controller) {
    this.get(path, controller.list);
    this.get(`${path}/info`, controller.info);
    this.get(`${path}/:id`, controller.get);
    this.post(path, controller.insert);
    this.delete(`${path}/:id`, controller.delete);
    this.put(`${path}/:id`, controller.update);
  }
};
