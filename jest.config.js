/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
