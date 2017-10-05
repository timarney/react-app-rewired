const path = require("path");
const paths = require("./utils/paths");

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const jestConfigPath = paths.scriptVersion + "/scripts/utils/createJestConfig";
require(paths.scriptVersion + '/config/env');
const createJestConfig = require(jestConfigPath);
const rewireJestConfig = require("./utils/rewireJestConfig");
const override = require(paths.configOverrides);
const overrideFn = (typeof override === 'function' || typeof override.jest !== 'function')
  ? (config) => config
  : override.jest;

// hide overrides in package.json for CRA's original createJestConfig
const packageJson = require(paths.appPackageJson);
const jestOverrides = packageJson.jest;
delete packageJson.jest;

const config = createJestConfig(
  relativePath => path.resolve(paths.appPath, "node_modules", paths.scriptVersion, relativePath),
  path.resolve(paths.appSrc, ".."),
  false
);

// restore overrides for rewireJestConfig
packageJson.jest = jestOverrides;

require.cache[require.resolve(jestConfigPath)].exports =
  () => overrideFn(rewireJestConfig(config));

// Passing the --scripts-version on to the original test script can result
// in the test script rejecting it as an invalid option. So strip it out of
// the command line arguments before invoking the test script.
if (paths.customScriptsIndex > -1) {
  process.argv.splice(paths.customScriptsIndex, 2);
}
require(paths.scriptVersion + '/scripts/test');
