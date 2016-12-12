function rewirePolyfills(config, env) {
  config.entry = ['babel-polyfill'].concat(config.entry);

  return config;
}

module.exports = rewirePolyfills;
