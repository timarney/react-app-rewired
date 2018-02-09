const { injectBabelPlugin } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = injectBabelPlugin('babel-plugin-transform-decorators-legacy', config);
  return config;
}
