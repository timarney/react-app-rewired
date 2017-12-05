const {paths} = require('./');
const override = require(paths.configOverrides);

const webpack = typeof override === 'function'
  ? override
  : override.webpack || ((config, env) => config);

const devserver = override.devserver
  || ((configFunction) =>
    (proxy, allowedHost) =>
      configFunction(proxy, allowedHost));

const jest = override.jest || ((config) => config);

// normalized overrides functions
module.exports = {
  webpack,
  devserver,
  jest
};
