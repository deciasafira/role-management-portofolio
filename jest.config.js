

module.exports = {
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "^.+\\.svg$": "./svgTransform.js"
    },
};