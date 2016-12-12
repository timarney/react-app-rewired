function rewireEslint(config, env) {
  delete config.eslint.configFile;
  config.eslint.useEslintrc = true;

  return config;
}

module.exports = rewireEslint;
