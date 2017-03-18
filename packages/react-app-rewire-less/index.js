const ExtractTextPlugin = require('extract-text-webpack-plugin');

const urlLoader = function (conf) {
  return conf.loader === 'url';
};

function rewireLess (config, env) {
  config.module.loaders.find(urlLoader).exclude.push(/\.less$/);

  config.module.loaders.push({
    test: /\.less$/,
    loader: (env === 'development')
      ? 'style!css!less'
      : ExtractTextPlugin.extract('style', 'css!less')
  });

  return config;
}

module.exports = rewireLess;
