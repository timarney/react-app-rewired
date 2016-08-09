var rewire = require('rewire')
var override = require('../config-overrides')
var port = process.env.PORT || 3000
var defaults = rewire('react-scripts/scripts/start.js')
var config = defaults.__get__('config')

config = override(config)

// override the default
defaults.__set__('config', config)
defaults.__get__('run')(port)
