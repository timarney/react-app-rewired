const path = require('path');
const { getLoader } = require('react-app-rewired');

function rewireLess (config, env, lessLoaderOptions = {}) {
  const lessExtension = /\.less$/;

  const fileLoader = getLoader(
    config.module.rules, rule => rule.loader && typeof rule.loader === 'string' && rule.loader.endsWith(`file-loader${path.sep}index.js`)
  );
  fileLoader.exclude.push(lessExtension);

  const cssRules = getLoader(
    config.module.rules, rule => String(rule.test) === String(/\.css$/)
  );

  let lessRules;
  if (env === 'production') {
    lessRules = {
      test: lessExtension,
      loader: [
        // TODO: originally this part is wrapper in extract-text-webpack-plugin
        //       which we cannot do, so some things like relative publicPath
        //       will not work.
        //       https://github.com/timarney/react-app-rewired/issues/33
        ...cssRules.loader,
        { loader: 'less-loader', options: lessLoaderOptions }
      ]
    };
  } else {
    lessRules = {
      test: lessExtension,
      use: [
        ...cssRules.use,
        { loader: 'less-loader', options: lessLoaderOptions }
      ]
    };
  }

  config.module.rules.push(lessRules);

  return config;
}

module.exports = rewireLess;
