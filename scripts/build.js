process.env.NODE_ENV = 'production'
var override = require('../config-overrides')

var rimrafSync = require('rimraf').sync
var webpack = require('webpack')
var config = require('react-scripts/config/webpack.config.prod')

config = override(config)

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
