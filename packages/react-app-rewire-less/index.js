function rewireLess (config, env, lessLoaderOptions = {}) {
  const lessExtension = /\.less$/;

  config.module.rules
    .find(rule => rule.loader === 'file-loader')
    .exclude.push(lessExtension);

  const cssRules = config.module.rules.find(rule => String(rule.test) === String(/\.css$/));

  let lessRules;
  if (env === 'production') {
    const cssLoaders = cssRules.loader;
    if (!cssLoaders || cssLoaders.length !== 4) {
      throw new Error('Unexpected CRA CSS loaders configuration');
    }

    const [
      extractTextLoader,
      styleLoader,
      cssLoader,
      postCssLoader
    ] = cssLoaders;

    lessRules = {
      test: lessExtension,
      loader: [
        extractTextLoader,
        styleLoader,
        cssLoader,
        { loader: 'less-loader', options: lessLoaderOptions },
        postCssLoader
      ]
    };
  } else {
    const cssLoaders = cssRules.use;
    if (!cssLoaders || cssLoaders.length !== 3) {
      throw new Error('Unexpected CRA CSS loaders configuration');
    }

    const [styleLoader, cssLoader, postCssLoader] = cssLoaders;

    lessRules = {
      test: lessExtension,
      use: [
        styleLoader,
        cssLoader,
        { loader: 'less-loader', options: lessLoaderOptions },
        postCssLoader
      ]
    };
  }

  config.module.rules.push(lessRules);

  return config;
}

module.exports = rewireLess;
