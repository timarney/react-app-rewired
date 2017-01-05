function rewirePreact(config, env) {
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }

  return config;
}

module.exports = rewirePreact;
