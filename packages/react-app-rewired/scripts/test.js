const path = require("path");
const paths = require("./utils/paths");

const jestConfigPath = paths.scriptVersion + "/scripts/utils/createJestConfig";
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

require(paths.scriptVersion + '/scripts/test');
