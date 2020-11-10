const {
  Render,
} = require("../modules");
const views = require("../views");
const viewHelpers = require("../views/helpers");

const renderer = new Render(views, viewHelpers);

function render(viewName, data) {
  return renderer.render(viewName, data);
}

module.exports = render;
