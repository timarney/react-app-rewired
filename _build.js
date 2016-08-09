process.env.NODE_ENV = 'production'

var rimrafSync = require('rimraf').sync
var webpack = require('webpack')
// pull in the prod webback build
var config = require('react-scripts/config/webpack.config.prod')

// mod the PostCSS setup ... or whatever you want here
config.postcss = function () {
  var autoprefixer = require('autoprefixer')
  var eh = require('postcss-canadian-stylesheets')
  return [autoprefixer, eh]
}

var paths = require('react-scripts/config/paths')
rimrafSync(paths.appBuild + '/*')

console.log('Creating an optimized production build...')
webpack(config).run(function (err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:')
    console.error(err.message || err)
    process.exit(1)
  }

  console.log('Compiled successfully.')
})
