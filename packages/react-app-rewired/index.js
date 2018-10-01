const path = require('path');
const paths = require('./scripts/utils/paths');

const loaderNameMatches = function(rule, loader_name) {
  return rule && rule.loader && typeof rule.loader === 'string' &&
    (rule.loader.indexOf(`${path.sep}${loader_name}${path.sep}`) !== -1 ||
    rule.loader.indexOf(`@${loader_name}${path.sep}`) !== -1);
};

const babelLoaderMatcher = function(rule) {
  return loaderNameMatches(rule, 'babel-loader');
};

const getLoader = function(rules, matcher) {
  let loader;

  rules.some(rule => {
    return (loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [], matcher));
  });

  return loader;
};

const removeLoader = (config, loader) => {
  const rules = config.module.rules
  const LoaderMatcher = function(rule) {
    return loaderNameMatches(rule, loader);
  };
  let loaderObj = getLoader(rules, LoaderMatcher)

  const removeLoaderRecursive = (rules) => {
    rules.forEach((rule,index) => {
      if(rule.loader){
        if(loaderObj.loader == rule.loader){
          rules.splice(index,1)
        }
      }else if(rule.use){
        removeLoaderRecursive(rule.use)
      }else if(rule.oneOf){
        removeLoaderRecursive(rule.oneOf)
      }
    })
  };

  removeLoaderRecursive(rules)
}

const getBabelLoader = function(rules) {
  return getLoader(rules, babelLoaderMatcher);
};

const injectBabelPlugin = function(pluginName, config) {
  const loader = getBabelLoader(config.module.rules);
  if (!loader) {
    console.log('babel-loader not found');
    return config;
  }
  // Older versions of webpack have `plugins` on `loader.query` instead of `loader.options`.
  const options = loader.options || loader.query;
  options.plugins =  [pluginName].concat(options.plugins || []);
  return config;
};

const compose = function(...funcs) {
  if (funcs.length === 0) {
    return config => config;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (config, env) => a(b(config, env), env));
};

module.exports = {
  getLoader,
  removeLoader,
  loaderNameMatches,
  getBabelLoader,
  injectBabelPlugin,
  compose,
  paths
};
