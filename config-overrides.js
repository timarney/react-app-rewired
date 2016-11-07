module.exports = function override (config) {
  
  
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }
  

  config.postcss = function () {
    var autoprefixer = require('autoprefixer')
    var eh = require('postcss-canadian-stylesheets')
    return [autoprefixer, eh]
  }
  
  return config
}
