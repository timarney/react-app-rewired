#CSS Modules

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
const {getLoader} = require('react-app-rewired');

const cssLoaderMatcher = function(rule) {
  return rule.loader && rule.loader.indexOf(`css-loader`) != -1;
}

module.exports = function override(config, env) {

  let l = getLoader(config.module.rules,cssLoaderMatcher);

  l.options = {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          }
  return config;
}

```

* **Update your components**

```javascript
/* App.js */

import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```

```bash
$ npm start
```
