const { scriptVersion } = require('../scripts/utils/paths');
const overrides = require('../config-overrides');

const devServerConfigPath = `${scriptVersion}/config/webpackDevServer.config.js`;
const devServerConfig = require(devServerConfigPath);

// override config in memory
require.cache[require.resolve(devServerConfigPath)].exports =
	overrides.devServer(devServerConfig, process.env.NODE_ENV);

module.exports = require(devServerConfigPath);
