const checkRuleLegacy = function(conf) {
  if (!conf.loader) return false;
  return conf.loader.indexOf("babel-loader") > -1;
};

const getLoader = function(config) {
  let babelLoader = false;
  let isBabel = false;
  const checkRule = rule =>
    rule.loader && rule.loader.indexOf("babel-loader") != -1;

  config.module.rules.forEach(rule => {
    if (!rule.oneOf) {
      isBabel = config.module.rules.find(checkRuleLegacy);

      if (isBabel) {
        babelLoader = isBabel;
      }

      return;
    }

    isBabel = rule.oneOf.find(checkRule);
    if (isBabel) {
      babelLoader = isBabel;
    }
  });

  return babelLoader;
};

const injectBabelPlugin = function(pluginName, config) {
  const loader = getLoader(config);
  if (!loader) {
    console.log("babel-loader not found");
    return config;
  }
  loader.options.plugins = [pluginName].concat(loader.options.plugins || []);
  return config;
};

module.exports = { injectBabelPlugin };
