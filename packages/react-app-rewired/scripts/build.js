process.env.NODE_ENV = 'production';

const paths = require('./utils/paths');
const overrides = require('../config-overrides');
const scriptPkg = require(paths.scriptVersion + "/package.json");

const isOldScript = !(scriptPkg && scriptPkg.version >= '2.1.2');

const webpackConfigPath = paths.scriptVersion + isOldScript ? "/config/webpack.config.prod" : "/config/webpack.config";

// load original config
const webpackConfig = require(webpackConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  isOldScript ? overrides.webpack(webpackConfig, process.env.NODE_ENV) : (env) => overrides.webpack(webpackConfig(env), env);
// run original script
require(paths.scriptVersion + '/scripts/build');
