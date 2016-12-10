const babelLoader = function (conf) {
  return conf.loader === 'babel';
};

function rewireRelay(config, env) {
  const babelrc = config.module.loaders.find(babelLoader).query;
  babelrc.plugins = ['react-relay'].concat(babelrc.plugins || []);

  return config;
}

module.exports = rewireRelay;
