# Rewire create-react-app to use LESS and LESS modules!

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
  // config = rewireLess.withLoaderOptions({
  //  modifyVars: {
  //     "@primary-color": "#1890ff",
  //    },
  //})(config, env);
  return config;
}
```

In your React application:

```jsx harmony
// src/App.js

import React from 'react';
import './index.less';
import styles from './App.module.less';

export default ({text}) => (
    <div className={styles.app}>{text}</div>
)
```

Regular less files are loaded as global styles

```less
// src/index.less
body {
  font-family: "Comic Sans MS",
}
```

Module less files are loaded as CSS modules

```less
// src/App.module.less

.app {
  color: aqua;

  &:hover {
    color: lawngreen;
  }
}
```