function rewirePreact(config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "react": "preact-compat",
    "react-dom": "preact-compat",
    "mobx-react": "mobx-preact"
  });

  return config;
}

module.exports = rewirePreact;
