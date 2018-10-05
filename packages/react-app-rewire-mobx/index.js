const {injectBabelPlugin} = require('react-app-rewired');

function rewireMobX(config, env) {
  return injectBabelPlugin([
    '@babel/plugin-proposal-decorators', {
        legacy: true,
    }], config);
}

module.exports = rewireMobX;
