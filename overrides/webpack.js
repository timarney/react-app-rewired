const semver = require('semver');

const { scriptVersion } = require('../scripts/utils/paths');
const overrides = require('../config-overrides');
const scriptPkg = require(`${scriptVersion}/package.json`);

// CRA 2.1.2 switched to using a webpack config factory
// https://github.com/facebook/create-react-app/pull/5722
// https://github.com/facebook/create-react-app/releases/tag/v2.1.2
const isWebpackFactory = semver.gte(scriptPkg && scriptPkg.version, '2.1.2');
const webpackFactoryEnvSuffix = process.env.NODE_ENV === 'production' ? '.prod' : '.dev';

const webpackConfigPath = `${scriptVersion}/config/webpack.config${!isWebpackFactory ? webpackFactoryEnvSuffix : ''}`;
const webpackConfig = require(webpackConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = isWebpackFactory
	? (env) => overrides.webpack(webpackConfig(env), env)
	: overrides.webpack(webpackConfig, process.env.NODE_ENV);

module.exports = require(webpackConfigPath);
