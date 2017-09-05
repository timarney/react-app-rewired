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

const paths = require("./utils/paths");
// Ensure environment variables are read.
require(paths.scriptVersion + "/config/env");

const jest = require("jest");
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf("--coverage") < 0) {
  argv.push("--watch");
}


const createJestConfig = require("./utils/createJestConfig");
const override = require(paths.configOverrides);
const overrideFn = (typeof override === 'function' || typeof override.jest !== 'function')
  ? (config) => config
  : override.jest;

const path = require("path");

argv.push(
  "--config",
  JSON.stringify(
    overrideFn(createJestConfig(
      relativePath => path.resolve(__dirname, "..", relativePath),
      path.resolve(paths.appSrc, ".."),
      false
    ))
  )
);

jest.run(argv);
