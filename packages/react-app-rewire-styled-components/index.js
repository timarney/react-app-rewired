const babelLoader = function (conf) {
  return conf.loader === 'babel';
};

function rewireStyledComponents(config, env) {
  const babelrc = config.module.loaders.find(babelLoader).query;
  babelrc.plugins = ['styled-components'].concat(babelrc.plugins || []);

  return config;
}

module.exports = rewireStyledComponents;
