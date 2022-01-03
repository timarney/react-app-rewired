const { scriptVersion } = require('../scripts/utils/paths');
const overrides = require('../config-overrides');

const pathsConfigPath = `${scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports =
	overrides.paths(pathsConfig, process.env.NODE_ENV);

module.exports = require(pathsConfigPath);
