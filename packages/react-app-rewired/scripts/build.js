/* build.js */
process.env.NODE_ENV = 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');
const webpackConfig = paths.scriptVersionDir + '/config/webpack.config.prod';
const config = require(webpackConfig);
const override = require(paths.projectDir + '/config-overrides');

require.cache[require.resolve(webpackConfig)].exports =
  override(config, process.env.NODE_ENV);

require(paths.scriptVersionDir + '/scripts/build');
