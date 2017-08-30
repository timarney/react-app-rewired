const babelLoaderMatcher = function(rule) {
  return rule.loader && rule.loader.indexOf(`babel-loader${path.sep}`) != -1;
}

const getLoader = function(rules, matcher) {
  var loader;

  rules.some(rule => {
    return loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || [], matcher);
  });

  return loader;
};

const getBabelLoader = function(rules) {
  return getLoader(rules, babelLoaderMatcher);
}

const injectBabelPlugin = function(pluginName, config) {
  const loader = getBabelLoader(config.module.rules);
  if (!loader) {
    console.log("babel-loader not found");
    return config;
  }
  loader.options.plugins = [pluginName].concat(loader.options.plugins || []);
  return config;
};

module.exports = { getLoader, getBabelLoader, injectBabelPlugin };
