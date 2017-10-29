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


## Utilities 

#### 1) injectBabelPlugin

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

#### 2) compose(after v1.3.4)

You can use this util to `compose` rewires.
Before:
```javascript
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireLess(config, env);
  config = rewirePreact(config, env);
  config = rewireMobX(config,env);
  
  return config;
}
```
After use `compose`:
```javascript
/* config-overrides.js */
const { compose } = require('react-app-reiwred');

module.exports = compose(
  rewireLess,
  rewirePreact,
  rewireMobx
  ...
)
//  custom config 
module.exports = function(config, env){
  const applyedRewires = compose(
    rewireLess,
    rewirePreact,
    rewireMobx
    ...
  );
  // do custom config
  // ...
  return applyedReiwres(config, env);
}
```
Some change with rewire, if you want to add some `extra param` for `rewire`  
1. Optional params:  
you can see [react-app-rewire-less](https://github.com/timarney/react-app-rewired/blob/master/packages/react-app-rewire-less/index.js)  

2. Required params:  
```javascript
// rewireSome.js
const createRewire(requiredParams){
  return function rewire(config, env){
    ///
    return config
  }
}
module.exports = createRewire;
```



# Community Maintained Rewires

## Babel plugins

* [react-app-rewire-emotion](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-emotion) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-lodash](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-lodash) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-styled-components](https://github.com/withspectrum/react-app-rewire-styled-components) by [@mxstbr](https://github.com/mxstbr)

## Webpack plugins

* [react-app-rewire-appcache-plugin](https://github.com/lwd-technology/react-app-rewire-appcache-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-define-plugin](https://github.com/lwd-technology/react-app-rewire-define-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-imagemin-plugin](https://github.com/lwd-technology/react-app-rewire-imagemin-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-preload-plugin](https://github.com/lwd-technology/react-app-rewire-preload-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-provide-plugin](https://github.com/lwd-technology/react-app-rewire-provide-plugin) by [@icopp](https://github.com/icopp)

## Loaders

* [react-app-rewire-nearley](https://github.com/lwd-technology/react-app-rewire-nearley) by [@icopp](https://github.com/icopp)
* [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@icopp](https://github.com/icopp)

## Other

* [react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-react-library](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library) by [@osdevisnot](https://github.com/osdevisnot)

# Why This Project Exists

See: [Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


