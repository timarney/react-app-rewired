process.env.NODE_ENV = 'production';

const semver = require('semver');

const { scriptVersion } = require('./utils/paths');
const overrides = require('../config-overrides');
const scriptPkg = require(`${scriptVersion}/package.json`);

const pathsConfigPath = `${scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports =
  overrides.paths(pathsConfig, process.env.NODE_ENV);

// CRA 2.1.2 switched to using a webpack config factory
// https://github.com/facebook/create-react-app/pull/5722
// https://github.com/facebook/create-react-app/releases/tag/v2.1.2
const isWebpackFactory = semver.gte(scriptPkg && scriptPkg.version, '2.1.2');

const webpackConfigPath = `${scriptVersion}/config/webpack.config${!isWebpackFactory ? '.prod' : ''}`;
const webpackConfig = require(webpackConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = isWebpackFactory
  ? (env) => overrides.webpack(webpackConfig(env), env)
  : overrides.webpack(webpackConfig, process.env.NODE_ENV);

// run original script
require(`${scriptVersion}/scripts/build`);
