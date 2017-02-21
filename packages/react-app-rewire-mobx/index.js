const babelLoader = function (conf) {
  return conf.loader === 'babel-loader';
};

//webpack2
function rewireMobX(config, env) {
  const babelrc = config.module.rules.find(babelLoader).options;
  babelrc.plugins = ['transform-decorators-legacy'].concat(babelrc.plugins || []);
  return config;
}

module.exports = rewireMobX;
