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

You can use this util to compose rewires.
> A functional programming utility, performs `right-to-left` function composition.     
More detail you can see [ramda](http://ramdajs.com/docs/#compose) or [redux](http://redux.js.org/docs/api/compose.html#composefunctions)  

Before:
```javascript
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireLess(config, env);
  config = rewirePreact(config, env);
  config = rewireMobX(config, env);
  
  return config;
}
```
After use `compose`:
```javascript
/* config-overrides.js */
const { compose } = require('react-app-rewired');

module.exports = compose(
  rewireLess,
  rewirePreact,
  rewireMobx
  ...
)
//  custom config 
module.exports = function(config, env){
  const rewires = compose(
    rewireLess,
    rewirePreact,
    rewireMobx
    ...
  );
  // do custom config
  // ...
  return rewires(config, env);
}
```
Some change with rewire, if you want to add some `extra param` for `rewire`  
1. Optional params:  
you can see [react-app-rewire-less](https://github.com/timarney/react-app-rewired/blob/master/packages/react-app-rewire-less/index.js)  

2. Required params:  
```javascript
// rewireSome.js
function createRewire(requiredParams){
  return function rewire(config, env){
    ///
    return config
  }
}
module.exports = createRewire;
```

## Expanded Configuration Options
By default, the `override-config.js` file exports a single function to use when customising the webpack configuration for compiling your react app in development or production mode. It is possible to instead export an object from this file that contains up to three fields, each of which is a function. This alternative form allows you to also customise the configuration used for Jest (in testing), and for the Webpack Dev Server itself.

```javascript
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config customisation, rewires, etc...
    return config;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function(config) {
    // ...add your jest config customisation...
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // ...add your webpack dev server config customisation here...
      return config;
    }
  }
}
```
#### 1) Webpack configuration - Development & Production
The `webpack` field is used to provide the equivalent to the single-function export from config-overrides.js. This is where all the usual rewires are used. It is not able to configure compilation in test mode, as test mode does not get run through Webpack at all (it runs in Jest). It is also not able to be used to customise the Webpack Dev Server that is used to serve pages in development mode, because the react-scripts used in create-react-app create a separate configuration for use with the dev server using different functions and defaults.

#### 2) Jest configuration - Testing
In test mode, Webpack is not used for compiling your application. Instead, Jest is used directly. This means that any rewires specified in your webpack config customisation function will not be applied to your project in test mode.

React-app-rewired automatically allows you to customise your Jest configuration in a `jest` section of your `package.json` file, including allowing you to set configuration fields that create-react-app/react-scripts will usually block you from being able to set. It also automatically sets up Jest to compile the project with Babel prior to running tests. Jest's configuration options are documented separately at the [Jest website](https://facebook.github.io/jest/docs/en/configuration.html).

If you want to add plugins and/or presets to the Babel configuration that Jest will use, you need to define those plugins/presets in either a `babel` section inside the `package.json` file, or to provide a `.babelrc` file with the preset/plugin fields provided. React-app-rewired alters the Jest configuration to use these definition files for specifying babel options when Jest is compiling your react app. The format to use in the babel section/.babelrc files is documented separately at the [Babel website](https://babeljs.io/docs/usage/babelrc/).

The `jest` field in the module.exports object in `config-overrides.js` is used to specify a function that can be called to customise the Jest testing configuration in ways that are not possible in the jest section of the package.json file. For example, it will allow you to change some configuration options based on environment variables. This function is passed the default create-react-app Jest configuration as a parameter and is required to return the modified Jest configuration that you want to use. A lot of the time, you'll be able to make the configuration changes needed simply by using a combination of the `package.json` file's jest section and a `.babelrc` file instead of needing to provide this jest function in `config-overrides.js`.

#### 3) Webpack Dev Server
When running in development mode, create-react-app/react-scripts do not use the usual config for the development server itself. This means that you cannot use the normal `webpack` section of the `config-overrides.js` server to make changes to the development server settings - those changes won't be applied.

Instead of this, create-react-app expects to be able to call a function to generate the webpack dev server when needed. This function is provided with parameters for the proxy and allowedHost settings to be used in the webpack dev server (create-react-app retrieves the values for those parameters from your package.json file).

React-app-rewired provides the ability to override this function through use of the `devServer` field in the module.exports object in `config-overrides.js`. It provides the devServer function a single parameter containing the create-react-app/react-scripts function that is normally used to generate the dev server config (it cannot provide a generated version of the configuration because react-scripts is calling the generation function directly). React-app-rewired needs to receive as a return value a replacement function for the create-react-app dev server config function (i.e. the return value should be a new function that takes the two parameters for proxy and allowedHost and itself returns a webpack dev server configuration). The original react-scripts function is passed into the `config-overrides.js` devServer function so that you are able to easily call this yourself to generate your initial devServer configuration based on what the defaults used by create-react-app are.

# Community Maintained Rewires

## Babel plugins

* [react-app-rewire-emotion](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-emotion) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-lodash](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-lodash) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-styled-components](https://github.com/withspectrum/react-app-rewire-styled-components) by [@mxstbr](https://github.com/mxstbr)
* [react-app-rewire-polished](https://github.com/rawrmonstar/react-app-rewire-polished) by [@rawrmonstar](https://github.com/rawrmonstar)
* [react-app-rewire-idx](https://github.com/viktorivarsson/react-app-rewire-idx) by [@viktorivarsson](https://github.com/viktorivarsson)
* [react-app-rewire-glamorous-displayname](https://github.com/CarlRosell/react-app-rewire-glamorous-displayname) by [@CarlRosell](https://github.com/CarlRosell)

## Webpack plugins

* [react-app-rewire-appcache-plugin](https://github.com/lwd-technology/react-app-rewire-appcache-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-define-plugin](https://github.com/lwd-technology/react-app-rewire-define-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-imagemin-plugin](https://github.com/lwd-technology/react-app-rewire-imagemin-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-preload-plugin](https://github.com/lwd-technology/react-app-rewire-preload-plugin) by [@icopp](https://github.com/icopp)
* [react-app-rewire-provide-plugin](https://github.com/lwd-technology/react-app-rewire-provide-plugin) by [@icopp](https://github.com/icopp)

## Loaders

* [react-app-rewire-nearley](https://github.com/lwd-technology/react-app-rewire-nearley) by [@icopp](https://github.com/icopp)
* [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@icopp](https://github.com/icopp)
* [react-app-rewire-css-modules](https://github.com/codebandits/react-app-rewire-css-modules) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-svg-react-loader](https://github.com/codebandits/react-app-rewire-svg-react-loader) by [@lnhrdt](https://github.com/lnhrdt)

## Other

* [react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-react-library](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library) by [@osdevisnot](https://github.com/osdevisnot)

* [react-app-rewired with Inferno](packages/react-app-rewired/examples/inferno.md)
* [react-app-rewired with react-styleguideist](packages/react-app-rewired/examples/react-styleguidist.md)
* [react-app-rewired with react-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader) by [@cdharris](https://github.com/cdharris)

# Why This Project Exists

See: [Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


