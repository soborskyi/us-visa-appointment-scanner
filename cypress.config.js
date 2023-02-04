const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'specs/**/*.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
