module.exports = class Exception extends Error {
  constructor(type, detail = {}) {
    const errorDetails = {
      type,
      detail,
    };
    super(JSON.stringify(errorDetails));
    this.type = type;
    this.detail = detail;
    this.stackArray = this.stack.split("\n");
  }
};
