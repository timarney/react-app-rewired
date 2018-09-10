process.env.NODE_ENV = 'production';

const paths = require('./utils/paths');
const overrides = require('../config-overrides');
const webpackConfigPath = paths.scriptVersion + "/config/webpack.config.prod";

// load original config
const webpackConfig = require(webpackConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  overrides.webpack(webpackConfig, process.env.NODE_ENV);
// override paths in memory
if (paths.pathsOverrides) {
  const pathsOverridesFn = require(paths.pathsOverrides);
  require.cache[require.resolve(paths.scriptVersion + '/config/paths')].exports =
    pathsOverridesFn(paths.originPaths, process.env.NODE_ENV);
}
// run original script
require(paths.scriptVersion + '/scripts/build');
