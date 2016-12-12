/* start.js */
const fs = require('fs');
const path = require('path');
const config = require('react-scripts/config/webpack.config.dev');
const override = require(path.resolve(fs.realpathSync(process.cwd()) + '/config-overrides'));

require.cache[require.resolve('react-scripts/config/webpack.config.dev')].exports =
  override(config, process.env.NODE_ENV || 'development');

require('react-scripts/scripts/start');
