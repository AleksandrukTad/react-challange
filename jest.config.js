const moduleNameMapper = {
  "^components/(.*)": "<rootDir>/src/components/$1",
  "^features/(.*)": "<rootDir>/src/features/$1",
  "^apis/(.*)": "<rootDir>/src/apis/$1",
  "^models/(.*)": "<rootDir>/src/models/$1",
  "^utils/(.*)": "<rootDir>/src/utils/$1",
  "^rootReducer/(.*)": "<rootDir>/src/rootReducer/$1",
  "styled-components": "<rootDir>/node_modules/styled-components",
  "\\.svg": "<rootDir>/__mocks__/svgrMock.ts"
};

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/*.(spec|test).[jt]s?(x)",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/test/**",
    "!**/out/**",
    "!**/coverage/**",
    "!**/vendor/**",
    "!**/*.config.{ts,tsx,js,jsx}",
    "!**/*.setup.{ts,tsx,js,jsx}",
    "!**/jest.setupTest.{ts,js}",
    "!**/pages/**",
    "!**/apis/**"
  ],
  coverageReporters: ["lcov", "text"],
  coverageThreshold: {
    global: {
      // branches: 95,
      // functions: 95,
      // lines: 95,
      // statements: -10,
    }
  },
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  projects: [
    {
      name: "client",
      displayName: "client",
      testEnvironment: "jsdom",
      testMatch: [
        "**/__tests__/**/!(!*.node).(spec|test).[jt]s?(x)",
        "**/!(*.node).(spec|test).[jt]s?(x)"
      ],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      moduleNameMapper
    }
  ]
};
