/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const babelJest = require('babel-jest');

const customPlugins = []
try {
    console.log(require.resolve("transform-decorators-legacy"));
    customPlugins.push("transform-decorators-legacy")
} catch(e) {
    console.error("transform-decorators-legacy not found");
}

module.exports = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-react-app')],
  plugins: customPlugins,
  babelrc: false
});
