const presets = [
  "@babel/preset-typescript",
  "@babel/preset-env",
  ["@babel/preset-react", { runtime: "automatic" }]
];

const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: { "^.+\\.(ts|tsx)$": ["babel-jest", { presets  }] },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;


