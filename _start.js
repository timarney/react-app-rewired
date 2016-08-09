var rewire = require('rewire')
var port = process.env.PORT || 3000
var defaults = rewire('react-scripts/scripts/start.js')

// get the default webpack config
var config = defaults.__get__('config')

// mod the PostCSS setup
config.postcss = function () {
  var autoprefixer = require('autoprefixer')
  var eh = require('postcss-canadian-stylesheets')
  return [autoprefixer, eh]
}

// override the default config
defaults.__set__('config', config)
// kick things off
defaults.__get__('run')(port)
