const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9tryhz',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})