/* start.js */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const paths = require('./utils/paths');
const webpackConfig = paths.scriptVersion + '/config/webpack.config.dev';
const config = require(webpackConfig);
const override = require(paths.configOverrides);
const overrideFn = typeof override === 'function'
  ? override
  : override.webpack || ((config, env) => config);

require.cache[require.resolve(webpackConfig)].exports =
  overrideFn(config, process.env.NODE_ENV);

require(paths.scriptVersion + '/scripts/start');
