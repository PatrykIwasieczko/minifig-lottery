import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  setupFiles: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  coveragePathIgnorePatterns: [],
  modulePaths: [],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'jsx', 'node'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
  },
  resetMocks: true,
};

export default config;
