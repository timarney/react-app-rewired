module.exports = function override (config) {
  // setup Preact
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }


  //setup a PostCss plugin
  config.postcss = function () {
    var autoprefixer = require('autoprefixer')
    var eh = require('postcss-canadian-stylesheets')
    return [autoprefixer, eh]
  }

  return config
}
