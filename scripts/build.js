/* build.js */
process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');
const config = require('react-scripts/config/webpack.config.prod');
const override = require(path.resolve(fs.realpathSync(process.cwd()) + '/config-overrides'));

require.cache[require.resolve('react-scripts/config/webpack.config.prod')].exports =
  override(config, process.env.NODE_ENV);

require('react-scripts/scripts/build');
