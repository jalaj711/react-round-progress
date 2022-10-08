/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: [
      // "jest-canvas-mock"
    ],
    globals: {
      "IS_REACT_ACT_ENVIRONMENT": true
    },
    testPathIgnorePatterns: ["src/__tests__/data.tsx"]
  };
};
