import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  testTimeout: 120000,
  maxWorkers: 1,
  clearMocks: true,
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
  testEnvironment: "node",
  moduleDirectories: ['node_modules', 'logs', 'resources'],

  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
};

export default config;