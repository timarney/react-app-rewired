process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const { scriptVersion } = require('./utils/paths');

// override paths in memory
require('../overrides/paths');

// override createJestConfig in memory
require('../overrides/jest');

// run original script
require(`${scriptVersion}/scripts/test`);
