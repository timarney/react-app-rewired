const {paths} = require('./');
// load environment variables from .env files
// before overrides scripts are read
require(paths.scriptVersion + '/config/env');
const override = require(paths.configOverrides);

const webpack = typeof override === 'function'
  ? override
  : override.webpack || ((config, env) => config);

const devServer = override.devServer
  || ((config) => config);

const jest = override.jest || ((config) => config);

// normalized overrides functions
module.exports = {
  webpack,
  devServer,
  jest
};
