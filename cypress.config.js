const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video:true,
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})