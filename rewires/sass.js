const ExtractTextPlugin = require('extract-text-webpack-plugin');

const urlLoader = function (conf) {
  return conf.loader === 'url';
};

function rewireSass(config, env) {
  config.module.loaders.find(urlLoader).exclude.push(/\.scss$/);

  config.module.loaders.push({
    test: /\.scss$/,
    loader: (env === 'development')
      ? 'style!css!sass'
      : ExtractTextPlugin.extract('style', 'css!sass')
  });

  return config;
}

module.exports = rewireSass;
