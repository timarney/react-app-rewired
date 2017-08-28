/* start.js */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');
const webpackConfig = paths.scriptVersionDir + '/config/webpack.config.dev';
const config = require(webpackConfig);
const override = require(paths.projectDir + '/config-overrides');
const overrideFn = typeof override === 'function'
  ? override
  : override.webpack || ((config, env) => config);

require.cache[require.resolve(webpackConfig)].exports =
  overrideFn(config, process.env.NODE_ENV);

require(paths.scriptVersionDir + '/scripts/start');
