const path = require('path');
const { getLoader } = require('react-app-rewired');

// this is the path of eslint-loader `index.js`
const ESLINT_PATH = `eslint-loader${path.sep}index.js`;

function getEslintOptions(rules) {
  const matcher = (rule) => rule.loader 
    && typeof rule.loader === 'string' 
    && rule.loader.endsWith(ESLINT_PATH);
  return getLoader(rules, matcher).options;
}

function rewireEslint(config, env, override = f => f) {
  // if `react-scripts` version < 1.0.0
  // **eslint options** is in `config`
  const oldOptions = config.eslint;
  // else `react-scripts` >= 1.0.0
  // **eslint options** is in `config.module.rules`
  const newOptions = getEslintOptions(config.module.rules);

  // Thx @Guria, with no break change.
  const options = oldOptions || newOptions;
  options.useEslintrc = true;
  options.ignore = true;

  override(options);

  return config;
}

module.exports = rewireEslint;
