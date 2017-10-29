# Rewire create-react-app to use LESS!

You might not need this rewire, Create React App added guide about how to add Less support to CRA without the need of ejecting. See [Adding a CSS Preprocessor](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc) section of CRA guide. Also note, that their solution is based on compiling Less without using Webpack.

# Install

```bash
$ npm install --save react-app-rewire-less
```

# Add it to your project

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
const rewireLess = require('react-app-rewire-less');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireLess(config, env);
  // with loaderOptions
  // config = rewireLess.withLoaderOptions(someLoaderOptions)(config, env);
  return config;
}
```
