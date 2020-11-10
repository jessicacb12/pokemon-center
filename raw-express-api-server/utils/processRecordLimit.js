const config = require("config");

const { maxRecordListing } = config.app;

module.exports = function processRecordLimit(limit) {
  if (limit < maxRecordListing) return limit;
  return maxRecordListing;
};
