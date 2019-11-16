const path = require("path");

module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return (
      process.cwd() +
      testPath.replace(__dirname, "").replace("tests/", "") +
      snapshotExtension
    );
  },
  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    const splitedPath = snapshotFilePath.split("/");
    const fileName = splitedPath[splitedPath.length - 1];

    return (
      __dirname +
      snapshotFilePath
        .replace(process.cwd(), "")
        .slice(0, -fileName.length)
        .concat("tests/")
        .concat(fileName.slice(0, -snapshotExtension.length))
    );
  },

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: `${__dirname}/tests/example.spec.js`
};
