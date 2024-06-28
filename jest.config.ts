import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "ts",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  modulePaths: ["<rootDir>"]
};

export default config;
