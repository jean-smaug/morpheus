module.exports = {
  verbose: true,
  rootDir: __dirname,
  snapshotResolver: "<rootDir>/node_modules/@lano/morpheus/snapshotResolver.js",
  testMatch: ["<rootDir>/node_modules/@lano/morpheus/tests/morpheus.spec.js"],
  testPathIgnorePatterns: []
};
