/* build.js */
process.env.NODE_ENV = 'production';

// Load environment variables from .env files
require("react-scripts/config/env");

const paths = require('./utils/paths');
const webpackConfig = paths.scriptVersion + '/config/webpack.config.prod';
require(paths.scriptVersion + '/config/env');
const config = require(webpackConfig);
const override = require(paths.configOverrides);
const overrideFn = typeof override === 'function'
  ? override
  : override.webpack;

require.cache[require.resolve(webpackConfig)].exports =
  overrideFn(config, process.env.NODE_ENV);

require(paths.scriptVersion + '/scripts/build');
