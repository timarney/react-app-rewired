process.env.NODE_ENV = 'production';

const { scriptVersion } = require('./utils/paths');

// override paths in memory
require('../overrides/paths');

// override config in memory
require('../overrides/webpack');

// run original script
require(`${scriptVersion}/scripts/build`);
