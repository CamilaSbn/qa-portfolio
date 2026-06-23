const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testIgnore: '**/visual.test.js',
  timeout: 30000,
  use: {
    headless: true,
  },
});
