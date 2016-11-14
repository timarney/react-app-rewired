/* start.js */
var fs = require('fs');
var path = require('path');

var config = require('react-scripts/config/webpack.config.dev')
var override = require(path.resolve(fs.realpathSync(process.cwd()) + '/config-overrides'));

require.cache[require.resolve('react-scripts/config/webpack.config.dev')].exports =
override(config, process.env.NODE_ENV || 'development');

require('react-scripts/scripts/start')