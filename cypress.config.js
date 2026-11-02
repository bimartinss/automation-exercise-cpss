const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Resultado dos testes",
    embeddedScreenshots: true,
    inlineAssets: true
  }
});