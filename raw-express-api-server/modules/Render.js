const {
  ViewNotFoundException,
  ViewHelperNotFoundException,
} = require("../exceptions");

class Render {
  constructor(viewIndex, helpers) {
    this.viewIndex = viewIndex;
    this.helpers = helpers;
  }

  render(viewName, data) {
    if (typeof (data) !== "object" && !Array.isArray(data)) return data;
    const { viewIndex } = this;
    const view = viewIndex[viewName];
    if (!view) {
      throw new ViewNotFoundException(viewName);
    }
    if (Array.isArray(data)) {
      const result = [];
      for (let i = 0; i < data.length; i += 1) {
        result.push(this.renderView(view, data[i]));
      }
      return result;
    }
    return this.renderView(view, data);
  }

  renderView(view, data) {
    const result = {};
    const entries = Object.entries(view);
    const { helpers } = this;
    for (let i = 0; i < entries.length; i += 1) {
      const [key, settings] = entries[i];
      const {
        format,
        from,
        process,
      } = settings;
      const intermediateValue = from ? data[from] : data[key];
      let value = intermediateValue;
      if (format) {
        const formatProcess = helpers[format];
        if (!formatProcess) {
          throw new ViewHelperNotFoundException(format);
        }
        value = formatProcess(intermediateValue, data, settings);
      } else if (process) {
        value = process(intermediateValue, data, settings);
      } else if (settings.view) {
        value = this.render(settings.view, intermediateValue);
      }
      result[key] = value;
    }
    return result;
  }
}

module.exports = Render;
