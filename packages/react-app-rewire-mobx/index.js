const babelLoader = function (conf) {
  return conf.loader === 'babel';
};

function rewireMobX(config, env) {
  const babelrc = config.module.loaders.find(babelLoader).query;
  return config;
}

module.exports = rewireMobX;
