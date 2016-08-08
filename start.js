var rewire = require("rewire")
process.env.PORT = false;

//load the real start sript via rewire
/* https://www.npmjs.com/package/rewire */
var defaults = rewire('react-scripts/scripts/start.js')

//PostCSS plugins
var autoprefixer = require('autoprefixer')
var eh = require('postcss-canadian-stylesheets')

//setup the PostCSS we want to use
defaults.__set__("autoprefixer", autoprefixer)
defaults.__set__("eh", eh)

//get the default webpack config
var config = defaults.__get__("config")

//mod the PostCSS setup
config.postcss = function() {
    return [autoprefixer, eh];
}

//override the default config
defaults.__set__("config", config)


function run(port) {
  var setupCompiler = defaults.__get__("setupCompiler")
  var runDevServer = defaults.__get__("runDevServer")

  //call the 'real' kick-off scripts using the modified config
  setupCompiler(port)
  runDevServer(port)
}


//for testing we'll run this on port 8003 -- could pull from env
run(8003)