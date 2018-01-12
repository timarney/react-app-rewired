 
[![npm version](https://img.shields.io/npm/v/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)
 
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

## Extended Configuration Options
By default, the `override-config.js` file exports a single function to use when customising the webpack configuration for compiling your react app in development or production mode. It is possible to instead export an object from this file that contains up to three fields, each of which is a function. This alternative form allows you to also customise the configuration used for Jest (in testing), and for the Webpack Dev Server itself.

This example implementation is used to demonstrate using each of the object require functions. In the example, the functions:
* use the react-app-rewire-less package to add less support to your project
* have some tests run conditionally based on `.env` variables
* set the https certificates to use for the Development Server, with the filenames specified in `.env` file variables.
```javascript
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config customisation, rewires, etc...
    // Example: add less support to your app.
    const rewireLess = require('react-app-rewire-less');
    config = rewireLess(config, env);

    return config;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function(config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    if (!config.testPathIgnorePatterns) {
      config.testPathIgnorePatterns = [];
    }
    if (!process.env.RUN_COMPONENT_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
    }
    if (!process.env.RUN_REDUCER_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    }
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      const fs = require('fs');
      config.https = {
        key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
        cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
        ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
        passphrase: process.env.REACT_HTTPS_PASS
      };

      // Return your customised Webpack Development Server config.
      return config;
    }
  }
}
```

#### 1) Webpack configuration - Development & Production
The `webpack` field is used to provide the equivalent to the single-function exported from config-overrides.js. This is where all the usual rewires are used. It is not able to configure compilation in test mode because test mode does not get run through Webpack at all (it runs in Jest). It is also not able to be used to customise the Webpack Dev Server that is used to serve pages in development mode because create-react-app generates a separate Webpack configuration for use with the dev server using different functions and defaults.

#### 2) Jest configuration - Testing
Webpack is not used for compiling your application in Test mode - Jest is used instead. This means that any rewires specified in your webpack config customisation function _will not be applied_ to your project in test mode.

React-app-rewired automatically allows you to customise your Jest configuration in a `jest` section of your `package.json` file, including allowing you to set configuration fields that create-react-app would usually block you from being able to set. It also automatically sets up Jest to compile the project with Babel prior to running tests. Jest's configuration options are documented separately at the [Jest website](https://facebook.github.io/jest/docs/en/configuration.html).

If you want to add plugins and/or presets to the Babel configuration that Jest will use, you need to define those plugins/presets in either a `babel` section inside the `package.json` file or inside a `.babelrc` file. React-app-rewired alters the Jest configuration to use these definition files for specifying Babel options when Jest is compiling your react app. The format to use in the Babel section of package.json or the .babelrc file is documented separately at the [Babel website](https://babeljs.io/docs/usage/babelrc/).

The `jest` field in the module.exports object in `config-overrides.js` is used to specify a function that can be called to customise the Jest testing configuration in ways that are not possible in the jest section of the package.json file. For example, it will allow you to change some configuration options based on environment variables. This function is passed the default create-react-app Jest configuration as a parameter and is required to return the modified Jest configuration that you want to use. A lot of the time you'll be able to make the configuration changes needed simply by using a combination of the `package.json` file's jest section and a `.babelrc` file (or babel section in package.json) instead of needing to provide this jest function in `config-overrides.js`.

#### 3) Webpack Dev Server
When running in development mode, create-react-app does not use the usual Webpack config for the Development Server (the one that serves the app pages). This means that you cannot use the normal `webpack` section of the `config-overrides.js` server to make changes to the Development Server settings as those changes won't be applied.

Instead of this, create-react-app expects to be able to call a function to generate the webpack dev server when needed. This function is provided with parameters for the proxy and allowedHost settings to be used in the webpack dev server (create-react-app retrieves the values for those parameters from your package.json file).

React-app-rewired provides the ability to override this function through use of the `devServer` field in the module.exports object in `config-overrides.js`. It provides the devServer function a single parameter containing the default create-react-app function that is normally used to generate the dev server config (it cannot provide a generated version of the configuration because react-scripts is calling the generation function directly). React-app-rewired needs to receive as a return value a _replacement function_ for create-react-app to then use to generate the Development Server configuration (i.e. the return value should be a new function that takes the two parameters for proxy and allowedHost and itself returns a Webpack Development Server configuration). The original react-scripts function is passed into the `config-overrides.js` devServer function so that you are able to easily call this yourself to generate your initial devServer configuration based on what the defaults used by create-react-app are.

#### 4) Provide rewired webpack config for 3rd party tools
Some third party tools, like [`react-cosmos`](https://github.com/react-cosmos/react-cosmos) relies on your webpack config.
You can create `webpack.config.js` file and export rewired config using following snippet:
```js
const { paths } = require('react-app-rewired');
// require normalized overrides
const overrides = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config.dev');

module.exports = overrides.webpack(config, process.env.NODE_ENV);
```

Then just point to this file in tool configuration.

## Additional Issues and Options
#### 1) Entry Point: 'src/index.js'
At this point in time, it is difficult to change the entry point from the default `src/index.js` file due to the way that file is included by create-react-app. The normal rewiring process gets bypassed by several of the create-react-app scripts.

There are three work-arounds available here:
1. Simply require/import your desired file from inside the src/index.js file, like:
```javascript
require('./index.tsx');
```
2. Use a customised version of the react-scripts package that changes the entry point inside the scripts themselves (e.g. [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript) for a typescript project - see below for how to use custom script versions with react-app-rewired).
3. Override the `react-dev-utils/checkRequiredFiles` function to always return true (causing create-react-app to no longer try to enforce that the entry file must exist).

#### 2) Custom scripts versions
It is possible to use a custom version of the `react-scripts` package with react-app-rewired by specifying the name of the scripts package in the command line option `--scripts-version`.

A working example for using the scripts version option is:
```json
{
  "scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --scripts-version react-scripts-ts --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

React-app-rewired requires a custom react-scripts package to provide the following files:
* config/env.js
* config/webpack.config.dev.js
* config/webpack.config.prod.js
* config/webpackDevServer.config.js
* scripts/build.js
* scripts/start.js
* scripts/test.js
* scripts/utils/createJestConfig.js

#### 3) Specify config-overrides as a directory
React-app-rewired imports your config-overrides.js file without the '.js' extension. This means that you have the option of creating a directory called `config-overrides` at the root of your project and exporting your overrides from the default `index.js` file inside that directory.

If you have several custom overrides using a directory allows you to be able to put each override in a separate file. An example template that demonstrates this can be found in [Guria/rewired-ts-boilerplate](https://github.com/Guria/rewired-ts-boilerplate/tree/master/config-overrides) at Github.

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
* [react-app-rewire-coffeescript](https://github.com/stevefan1999/react-app-rewire-coffeescript) by [@stevefan1999](https://github.com/stevefan1999)
* [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@icopp](https://github.com/icopp)
* [react-app-rewire-css-modules](https://github.com/codebandits/react-app-rewire-css-modules) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-less-modules](https://github.com/andriijas/react-app-rewire-less-modules) by [@andriijas](https://github.com/andriijas)
* [react-app-rewire-svg-react-loader](https://github.com/codebandits/react-app-rewire-svg-react-loader) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-bem-i18n-loader](https://github.com/maxvipon/react-app-rewire-bem-i18n-loader) by [@maxvipon](https://github.com/maxvipon)
* [react-app-rewire-babel-loader](https://github.com/dashed/react-app-rewire-babel-loader) by [@dashed](https://github.com/dashed)
* [react-app-rewire-svgr](https://github.com/gitim/react-app-rewire-svgr) by [@gitim](https://github.com/gitim)

## Other

* [react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-react-library](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-vendor-splitting](https://github.com/andriijas/react-app-rewire-vendor-splitting) by [@andriijas](https://github.com/andriijas)

* [react-app-rewired with Inferno](packages/react-app-rewired/examples/inferno.md)
* [react-app-rewired with react-styleguideist](packages/react-app-rewired/examples/react-styleguidist.md)
* [react-app-rewired with react-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader) by [@cdharris](https://github.com/cdharris)

# Why This Project Exists

See: [Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


