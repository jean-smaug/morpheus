const path = require("path");

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname),
  snapshotResolver: path.resolve(__dirname, "snapshotResolver.js"),
  testMatch: [path.resolve(__dirname, "tests/morpheus.spec.js")],
  testPathIgnorePatterns: []
};
