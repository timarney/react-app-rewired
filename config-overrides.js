module.exports = function override (config) {
  config.postcss = function () {
    var autoprefixer = require('autoprefixer')
    var eh = require('postcss-canadian-stylesheets')
    return [autoprefixer, eh]
  }
  return config
}
