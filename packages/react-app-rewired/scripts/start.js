process.env.NODE_ENV = process.env.NODE_ENV || "development";

const paths = require("./utils/paths");
const overrides = require('../config-overrides');
const scriptPkg = require(paths.scriptVersion + "/package.json");

const isOldScript = !(scriptPkg && scriptPkg.version >= '2.1.2');

const webpackConfigPath = paths.scriptVersion + isOldScript ? "/config/webpack.config.dev" : "/config/webpack.config";
const devServerConfigPath = paths.scriptVersion + "/config/webpackDevServer.config.js";

// load original configs
const webpackConfig = require(webpackConfigPath);
const devServerConfig = require(devServerConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  isOldScript ? overrides.webpack(webpackConfig, process.env.NODE_ENV) : (env) => overrides.webpack(webpackConfig(env), env);

require.cache[require.resolve(devServerConfigPath)].exports =
  overrides.devServer(devServerConfig, process.env.NODE_ENV);

// run original script
require(paths.scriptVersion + "/scripts/start");