#SASS

Install the sass-loader webpack

```bash
$ npm install sass-loader node-sass webpack --save-dev
```

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
module.exports = function override(config, env) {
  config.module.loaders.push({
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
  });
}

```

* **Update your components**

```javascript
/* App.js */

import React, { Component } from 'react';
import logo from './logo.svg';
require("./App.scss");

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
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
