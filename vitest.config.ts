// vitest.config.ts

export default {
  test: {
    reporters: ["default", "html"],
    outputFile: "./vitest-report/index.html",
    coverage: {
      provider: "c8",
      reportsDirectory: "./vitest-report/coverage",
    },
    environment: "jsdom",
  },
};
