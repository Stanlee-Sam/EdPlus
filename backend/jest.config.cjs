/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
      diagnostics: false,
    },
  },
};
