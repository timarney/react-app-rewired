process.env.NODE_ENV = process.env.NODE_ENV || "development";

const paths = require("./utils/paths");
const overrides = require('../config-overrides');
const webpackConfigPath = paths.scriptVersion + "/config/webpack.config.dev";
const devServerConfigPath = paths.scriptVersion + "/config/webpackDevServer.config.js";

// load original configs
const webpackConfig = require(webpackConfigPath);
const devServerConfig = require(devServerConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  overrides.webpack(webpackConfig, process.env.NODE_ENV);

require.cache[require.resolve(devServerConfigPath)].exports =
  overrides.devServer(devServerConfig, process.env.NODE_ENV);

// override paths in memory
if (paths.pathsOverrides) {
  const pathsOverridesFn = require(paths.pathsOverrides);
  require.cache[require.resolve(paths.scriptVersion + '/config/paths')].exports =
    pathsOverridesFn(paths.originPaths, process.env.NODE_ENV);
}

// run original script
require(paths.scriptVersion + "/scripts/start");
