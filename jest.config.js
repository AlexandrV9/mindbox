/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  rootDir: "src",
  // setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.ts"],
  testPathIgnorePatterns: [`node_modules`, `<rootDir>.*/dist`],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
        diagnostics: { ignoreCodes: ["TS151001"] },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "\\.(module\\.css|css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "identity-obj-proxy",
  },
};
