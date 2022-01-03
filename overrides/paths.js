const paths = require('../scripts/utils/paths');
const overrides = require('../config-overrides');

const pathsConfigPath = `${paths.scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// extend paths with overrides
const extendedPaths = Object.assign({}, paths, overrides.paths(pathsConfig, process.env.NODE_ENV));

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports =
	extendedPaths;

module.exports = require(pathsConfigPath);
