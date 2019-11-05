module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
