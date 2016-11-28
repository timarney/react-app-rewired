#MobX using decorators

#### 1) Install MobX

```bash
$ npm install mobx mobx-react --save
```

#### 2) Install legacy decorators

```bash
npm install babel-plugin-transform-decorators-legacy --save-dev
```


#### 3) [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) 


#### 4) modify `config-overrides.js`

```javascript
module.exports = function override(config, env) {
  //add legacy decorators
  config.module.loaders[0].query.plugins =  ['transform-decorators-legacy'];
  return config;
}

```

#### 5) Update your components to use MobX


```javascript
import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';


var appState = observable({
    timer: 0
});

appState.resetTimer = function reset() {
    appState.timer = 0;
};

setInterval(function tick() {
    appState.timer += 1;
}, 1000);

@observer
class App extends Component {
    render() {
        return (
          <button onClick={()=> appState.resetTimer()}>
                Seconds passed: {appState.timer}
          </button>
         );
    }
};

export default App;

```

#### 6) Fire it up
```bash
$ npm start
```
