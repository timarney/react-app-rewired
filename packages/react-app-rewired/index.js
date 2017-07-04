const babelLoader = function(conf) {
  if (!conf.loader) return false;
  return conf.loader.indexOf("babel-loader") > -1;
};

const injectBabelPlugin = function(config, pluginName) {
  const babelrc = config.module.rules.find(babelLoader).options;
  babelrc.plugins = [pluginName].concat(babelrc.plugins || []);
  return config;
};

module.exports = { injectBabelPlugin };
