process.env.NODE_ENV = process.env.NODE_ENV || "development";

const paths = require("./utils/paths");
const overrides = require('../config-overrides');
const webpackConfigPath = paths.scriptVersion + "/config/webpack.config.dev";
const devserverConfigPath = paths.scriptVersion + "/config/webpackDevServer.config.js";

// load environment variables from .env files
require(paths.scriptVersion + '/config/env');
// load original configs
const webpackConfig = require(webpackConfigPath);
const devserverConfig = require(devserverConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  overrides.webpack(webpackConfig, process.env.NODE_ENV);
require.cache[require.resolve(devserverConfigPath)].exports =
  overrides.devserver(devserverConfig, process.env.NODE_ENV);
// run original script
require(paths.scriptVersion + "/scripts/start");
