module.exports = {
  rootDir: __dirname,
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  collectCoverageFrom: ["src/__tests__/*.spec.ts"]
};
