"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const jest = require("jest");
const path = require("path");
const paths = require("./utils/paths");
// Ensure environment variables are read.
require(paths.scriptVersion + "/config/env");

const argv = process.argv.slice(2);
// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf("--coverage") < 0) {
  argv.push("--watch");
}

const createJestConfig = require(paths.scriptVersion + "/scripts/utils/createJestConfig");
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

argv.push(
  "--config",
  JSON.stringify(overrideFn(rewireJestConfig(config)))
);

jest.run(argv);
