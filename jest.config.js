const config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    moduleNameMapper: {
        '\\.module\\.css$': 'jest-css-modules',
    },
};
export default config;
