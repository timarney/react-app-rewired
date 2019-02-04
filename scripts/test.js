process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const path = require("path");
let paths = require("./utils/paths");
const overrides = require('../config-overrides');
const rewireJestConfig = require("./utils/rewireJestConfig");
const createJestConfigPath = paths.scriptVersion + "/scripts/utils/createJestConfig";

const pathsConfigPath = `${paths.scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// extend paths with overrides
paths = Object.assign({}, paths, overrides.paths(pathsConfig, process.env.NODE_ENV));

// hide overrides in package.json for CRA's original createJestConfig
const packageJson = require(paths.appPackageJson);
const jestOverrides = packageJson.jest;
delete packageJson.jest;
// load original createJestConfig
const createJestConfig = require(createJestConfigPath);
// run original createJestConfig
const config = createJestConfig(
  relativePath => path.resolve(paths.appPath, "node_modules", paths.scriptVersion, relativePath),
  path.resolve(paths.appSrc, ".."),
  false
);
// restore overrides for rewireJestConfig
packageJson.jest = jestOverrides;
// override createJestConfig in memory
require.cache[require.resolve(createJestConfigPath)].exports =
  () => overrides.jest(rewireJestConfig(config));
// Passing the --scripts-version on to the original test script can result
// in the test script rejecting it as an invalid option. So strip it out of
// the command line arguments before invoking the test script.
if (paths.customScriptsIndex > -1) {
  process.argv.splice(paths.customScriptsIndex, 2);
}
// run original script
require(paths.scriptVersion + '/scripts/test');
