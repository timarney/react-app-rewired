/* build.js */
process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');
const webpackConfig = paths.scriptVersionDir + '/config/webpack.config.prod';
const config = require(webpackConfig);
const override = require(paths.projectDir + '/config-overrides');

require.cache[require.resolve(webpackConfig)].exports =
  override(config, process.env.NODE_ENV);

require(paths.scriptVersionDir + '/scripts/build');
