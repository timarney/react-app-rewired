/* build.js */
process.env.NODE_ENV = 'production';
var fs = require('fs');
var path = require('path');

var config = require('react-scripts/config/webpack.config.prod')
var override = require(path.resolve(fs.realpathSync(process.cwd()) + '/config-overrides'));

require.cache[require.resolve('react-scripts/config/webpack.config.prod')].exports =
override(config, process.env.NODE_ENV);

require('react-scripts/scripts/build')