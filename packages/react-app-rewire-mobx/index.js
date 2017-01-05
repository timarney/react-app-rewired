const babelLoader = function (conf) {
  return conf.loader === 'babel';
};

function rewireMobX(config, env) {
  const babelrc = config.module.loaders.find(babelLoader).query;
  babelrc.plugins = ['transform-decorators-legacy'].concat(babelrc.plugins || []);
  return config;
}

module.exports = rewireMobX;
