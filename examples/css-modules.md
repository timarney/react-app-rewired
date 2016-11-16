#CSS Modules



* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
module.exports = function override(config, env) {
  var loader = 'style!css?modules&';
  if (env === 'development') {
    loader += 'importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';
  } else {
    loader += '-autoprefixer&importLoaders=1!postcss';
  }
  // Find the right loader then patch its 'loader' property
  config.module.loaders.forEach(l => {
    if (String(l.test) == String(/\.css$/)) l.loader = loader
  })

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
$ npm run rewire:start
```
