function rewireMobX(config, env) {
  //add legacy decorators
  config.module.loaders[0].query.plugins =  ['transform-decorators-legacy'];
  return config;
}

module.exports = rewireMobx;
