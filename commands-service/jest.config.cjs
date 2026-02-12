/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  clearMocks: true,

  extensionsToTreatAsEsm: [".ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};
