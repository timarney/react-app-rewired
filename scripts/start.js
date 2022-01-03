process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { scriptVersion } = require('./utils/paths');

// override paths in memory
require('../overrides/paths');

// override config in memory
require('../overrides/webpack');
require('../overrides/devServer');

// run original script
require(`${scriptVersion}/scripts/start`);
