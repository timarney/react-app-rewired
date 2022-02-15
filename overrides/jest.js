const path = require('path');
const paths = require('./paths');
const overrides = require('../config-overrides');
const rewireJestConfig = require('../scripts/utils/rewireJestConfig');
const createJestConfigPath = `${paths.scriptVersion}/scripts/utils/createJestConfig`;

// hide overrides in package.json for CRA's original createJestConfig
const packageJson = require(paths.appPackageJson);
const jestOverrides = packageJson.jest;
delete packageJson.jest;
// load original createJestConfig
const createJestConfig = require(createJestConfigPath);
// run original createJestConfig
const config = createJestConfig(
	relativePath => path.resolve(paths.appPath, 'node_modules', paths.scriptVersion, relativePath),
	path.resolve(paths.appSrc, '..'),
	false
);
// restore overrides for rewireJestConfig
packageJson.jest = jestOverrides;
// override createJestConfig in memory
require.cache[require.resolve(createJestConfigPath)].exports =
	() => overrides.jest(rewireJestConfig(config));
// Passing the --scripts-version and --config-overrides on to the original test script can result
// in the test script rejecting it as an invalid option. So strip it out of
// the command line arguments before invoking the test script.
if (paths.customScriptsIndex > -1) {
	process.argv.splice(paths.customScriptsIndex, 2);
}
if (paths.configOverridesIndex > -1) {
	process.argv.splice(paths.configOverridesIndex, 2);
}

module.exports = require(createJestConfigPath);
