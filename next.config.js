/* eslint-disable no-param-reassign */
// next.config.js
// const withPlugins = require("next-compose-plugins")
// const optimizedImages = require("next-optimized-images")

// module.exports = withPlugins([optimizedImages], {})
const withOptimizedImages = require("next-optimized-images")

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  // your config for other plugins or the general next.js here...
})
