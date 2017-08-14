 <img alt="react-app-rewired" src="https://github.com/timarney/react-app-rewired/raw/master/assets/react-app-rewired.png" />

# Rewire Your App

Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.

All the benefits of create-react-app without the limitations of "no config". You can add plugins, loaders whatever you need.

> All you have to do is create your app using [create-react-app](https://github.com/facebookincubator/create-react-app) and then rewire it.

⚠️ **Please Note:**

> By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say you now "own" the configs. **No support** will be provided. Proceed with caution.

# How to rewire your create-react-app project


#### 1) Install react-app-rewired
```bash
$ npm install react-app-rewired --save-dev
```

#### 2) Create a `config-overrides.js` file in the root directory

```javascript
/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```

**Note:** You can use one of the default rewires (see the [packages](/packages) dir) or [injectBabelPlugin](https://github.com/timarney/react-app-rewired#utilities-injectbabelplugin)

#### 3) 'Flip' the existing calls to `react-scripts` in `npm` scripts
```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

#### 4) Start the Dev Server
```bash
$ npm start
```


#### 5) Build your app
```bash
$ npm run build
```


## Utilities (injectBabelPlugin)

Adding a Babel plugin can be done via the `injectBabelPlugin(pluginName, config)` function.  You can also use the "rewire" packages from this repo or listed below to do common config modifications.

```javascript
const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const {injectBabelPlugin} = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin('emotion/babel',config)
  
  // use the Preact rewire
  if (env === "production") {
    console.log("⚡ Production build with Preact");
    config = rewirePreact(config, env);
  }
  
  // use the MobX rewire
  config = rewireMobX(config,env);
  
  return config;
}
```

# Community Maintained Rewires

[react-app-rewire-styled-components](https://github.com/withspectrum/react-app-rewire-styled-components/blob/master/README.md) @mxstbr

[react-app-rewire-emotion](https://github.com/osdevisnot/react-app-rewire-emotion) @osdevisnot

[react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) @osdevisnot

# Why This Project Exists

See: [Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


