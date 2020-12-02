> ℹ️
Before submitting an issue to this repo - Ensure it's a **issue with the code in this repo**, not a **how do I configure** something with **Webpack** question (post something on Stack Overflow or Spectrum).  It's your config you "own" it.

- 🚨Version 2.0 removes the rewire helper functions
- [中文版本说明](./README_zh.md)

[![npm version](https://img.shields.io/npm/v/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)

 <img alt="react-app-rewired" src="https://github.com/timarney/react-app-rewired/raw/master/assets/react-app-rewired.png" />
 
 Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.

All the benefits of create-react-app without the limitations of "no config". You can add plugins, loaders whatever you need.


# Rewire Your App ☠

As of Create React App 2.0 this repo is "lightly" maintained mostly by the community at this point. 

⚠️ **Please Note:**

> By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say you now "own" the configs. **No support** will be provided. Proceed with caution.

"Stuff can break" — Dan Abramov
https://twitter.com/dan_abramov/status/1045809734069170176


<hr>

**Note:** I personally use [next.js](https://github.com/zeit/next.js/) or [Razzle](https://github.com/jaredpalmer/razzle) which both support custom Webpack out of the box.

## Alternatives 
You can try [customize-cra](https://github.com/arackaf/customize-cra) for a set of CRA 2.0 compatible rewirers,
or any of the alternative projects and forks that aim to support 2.0:

- [Rescripts](https://github.com/rescripts/rescripts), an alternative framework for extending CRA configurations (supports 2.0+).
- [react-scripts-rewired](https://github.com/marcopeg/create-react-app/blob/master/packages/react-scripts/README.md) for a fork of this project that aims to support CRA 2.0
- [craco](https://github.com/sharegate/craco)


# How to rewire your create-react-app project

> Create your app using [create-react-app](https://github.com/facebookincubator/create-react-app) and then rewire it.


#### 1) Install react-app-rewired

##### For create-react-app 2.x with Webpack 4:

```bash
$ npm install react-app-rewired --save-dev
```

##### For create-react-app 1.x or react-scripts-ts with Webpack 3:

```bash
$ npm install react-app-rewired@1.6.2 --save-dev
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

#### 3) 'Flip' the existing calls to `react-scripts` in `npm` scripts for start, build and test
```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

Note: Do NOT flip the call for the `eject` script.
That gets run only once for a project, after which you are given full control over the webpack configuration making `react-app-rewired` no longer required.
There are no configuration options to rewire for the `eject` script.

#### 4) Start the Dev Server
```bash
$ npm start
```


#### 5) Build your app
```bash
$ npm run build
```

## Extended Configuration Options
You can set a custom path for `config-overrides.js`. If you (for instance) wanted to use a 3rd-party `config-overrides.js` that exists in `node_modules`, you could add the following to your `package.json`:

```json
"config-overrides-path": "node_modules/some-preconfigured-rewire"
```

By default, the `config-overrides.js` file exports a single function to use when customising the webpack configuration for compiling your react app in development or production mode. It is possible to instead export an object from this file that contains up to three fields, each of which is a function. This alternative form allows you to also customise the configuration used for Jest (in testing), and for the Webpack Dev Server itself.

This example implementation is used to demonstrate using each of the object require functions. In the example, the functions:
* have some tests run conditionally based on `.env` variables
* set the https certificates to use for the Development Server, with the filenames specified in `.env` file variables.
```javascript
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
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
    };
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) {
    // ...add your paths config
    return paths;
  },
}
```

#### 1) Webpack configuration - Development & Production
The `webpack` field is used to provide the equivalent to the single-function exported from config-overrides.js. This is where all the usual rewires are used. It is not able to configure compilation in test mode because test mode does not get run through Webpack at all (it runs in Jest). It is also not able to be used to customise the Webpack Dev Server that is used to serve pages in development mode because create-react-app generates a separate Webpack configuration for use with the dev server using different functions and defaults.

#### 2) Jest configuration - Testing
Webpack is not used for compiling your application in Test mode - Jest is used instead. This means that any rewires specified in your webpack config customisation function _will not be applied_ to your project in test mode.

React-app-rewired automatically allows you to customise your Jest configuration in a `jest` section of your `package.json` file, including allowing you to set configuration fields that create-react-app would usually block you from being able to set. It also automatically sets up Jest to compile the project with Babel prior to running tests. Jest's configuration options are documented separately at the [Jest website](https://facebook.github.io/jest/docs/en/configuration.html). *Note:* Configuration arrays and objects are merged, rather than overwritten. See [#240](https://github.com/timarney/react-app-rewired/issues/240) and [#241](https://github.com/timarney/react-app-rewired/issues/241) for details

If you want to add plugins and/or presets to the Babel configuration that Jest will use, you need to define those plugins/presets in either a `babel` section inside the `package.json` file or inside a `.babelrc` file. React-app-rewired alters the Jest configuration to use these definition files for specifying Babel options when Jest is compiling your react app. The format to use in the Babel section of package.json or the .babelrc file is documented separately at the [Babel website](https://babeljs.io/docs/usage/babelrc/).

The `jest` field in the module.exports object in `config-overrides.js` is used to specify a function that can be called to customise the Jest testing configuration in ways that are not possible in the jest section of the package.json file. For example, it will allow you to change some configuration options based on environment variables. This function is passed the default create-react-app Jest configuration as a parameter and is required to return the modified Jest configuration that you want to use. A lot of the time you'll be able to make the configuration changes needed simply by using a combination of the `package.json` file's jest section and a `.babelrc` file (or babel section in package.json) instead of needing to provide this jest function in `config-overrides.js`.

#### 3) Webpack Dev Server
When running in development mode, create-react-app does not use the usual Webpack config for the Development Server (the one that serves the app pages). This means that you cannot use the normal `webpack` section of the `config-overrides.js` server to make changes to the Development Server settings as those changes won't be applied.

Instead of this, create-react-app expects to be able to call a function to generate the webpack dev server when needed. This function is provided with parameters for the proxy and allowedHost settings to be used in the webpack dev server (create-react-app retrieves the values for those parameters from your package.json file).

React-app-rewired provides the ability to override this function through use of the `devServer` field in the module.exports object in `config-overrides.js`. It provides the devServer function a single parameter containing the default create-react-app function that is normally used to generate the dev server config (it cannot provide a generated version of the configuration because react-scripts is calling the generation function directly). React-app-rewired needs to receive as a return value a _replacement function_ for create-react-app to then use to generate the Development Server configuration (i.e. the return value should be a new function that takes the two parameters for proxy and allowedHost and itself returns a Webpack Development Server configuration). The original react-scripts function is passed into the `config-overrides.js` devServer function so that you are able to easily call this yourself to generate your initial devServer configuration based on what the defaults used by create-react-app are.

#### 4) Paths configuration - Development & Production
The `paths` field is used to provide overrides for the `create-react-app` paths passed into webpack and jest.

#### 5) Provide rewired webpack config for 3rd party tools
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
It is possible to use a custom version of the `react-scripts` package with react-app-rewired by specifying the name of the scripts package in the command line option `--scripts-version` or setting `REACT_SCRIPTS_VERSION=<...>` via the environment.

A working example for using the scripts version option is:
```json
{
  "scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --scripts-version react-scripts-ts",
    "eject": "react-scripts eject"
  }
}
```

##### React-app-rewired 2.x requires a custom react-scripts package to provide the following files:
* config/env.js
* **config/webpack.config.js**
* config/webpackDevServer.config.js
* scripts/build.js
* scripts/start.js
* scripts/test.js
* scripts/utils/createJestConfig.js

##### React-app-rewired 1.x requires a custom react-scripts package to provide the following files:
* config/env.js
* **config/webpack.config.dev.js**
* **config/webpack.config.prod.js**
* config/webpackDevServer.config.js
* scripts/build.js
* scripts/start.js
* scripts/test.js
* scripts/utils/createJestConfig.js

#### 3) Specify config-overrides as a directory
React-app-rewired imports your config-overrides.js file without the '.js' extension. This means that you have the option of creating a directory called `config-overrides` at the root of your project and exporting your overrides from the default `index.js` file inside that directory.

If you have several custom overrides using a directory allows you to be able to put each override in a separate file. An example template that demonstrates this can be found in [Guria/rewired-ts-boilerplate](https://github.com/Guria/rewired-ts-boilerplate/tree/master/config-overrides) at Github.

#### 4) Specify config-overrides location from command line
If you need to change the location of your config-overrides.js you can pass a command line option --config-overrides <path> to the react-app-rewired script.

# Version 1.X Community Maintained Rewires (Check the plugin repo for 2.0 support)

## Babel plugins

* [react-app-rewire-emotion](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-emotion) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-lodash](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-lodash) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-styled-components](https://github.com/withspectrum/react-app-rewire-styled-components) by [@mxstbr](https://github.com/mxstbr)
* [react-app-rewire-polished](https://github.com/rawrmonstar/react-app-rewire-polished) by [@rawrmonstar](https://github.com/rawrmonstar)
* [react-app-rewire-idx](https://github.com/viktorivarsson/react-app-rewire-idx) by [@viktorivarsson](https://github.com/viktorivarsson)
* [react-app-rewire-glamorous-displayname](https://github.com/CarlRosell/react-app-rewire-glamorous-displayname) by [@CarlRosell](https://github.com/CarlRosell)
* [react-app-rewire-import](https://github.com/brianveltman/react-app-rewire-import) by [@brianveltman](https://github.com/brianveltman)
* [react-app-rewire-inline-import-graphql-ast](https://github.com/detrohutt/react-app-rewire-inline-import-graphql-ast) by [@detrohutt](https://github.com/detrohutt)
* [react-app-rewire-react-intl](https://github.com/clemencov/react-app-rewire-react-intl) by [@clemencov](https://github.com/clemencov)
* [react-app-rewire-lingui](https://github.com/Andreyco/react-app-rewire-lingui) by [@andreyco](https://github.com/Andreyco)
* [react-app-rewire-date-fns](https://github.com/stk-dmitry/react-app-rewire-date-fns) by [@stk-dmitry](https://github.com/stk-dmitry)

## Webpack plugins

* [react-app-rewire-appcache-plugin](https://github.com/lwd-technology/react-app-rewire-appcache-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-build-dev](https://github.com/raodurgesh/react-app-rewire-build-dev) by [@raodurgesh](https://github.com/raodurgesh)
* [react-app-rewire-define-plugin](https://github.com/lwd-technology/react-app-rewire-define-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-favicons-plugin](https://github.com/rickycook/react-app-rewire-favicons-plugin) by [@rickycook](https://github.com/rickycook)
* [react-app-rewire-imagemin-plugin](https://github.com/lwd-technology/react-app-rewire-imagemin-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-modernizr](https://github.com/ctrlplusb/react-app-rewire-modernizr) by [@ctrlplusb](https://github.com/ctrlplusb)
* [react-app-rewire-preload-plugin](https://github.com/lwd-technology/react-app-rewire-preload-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-provide-plugin](https://github.com/lwd-technology/react-app-rewire-provide-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-inline-source](https://github.com/marcopeg/react-app-rewire-inline-source) by [@marcopeg](https://github.com/marcopeg)
* [react-app-rewire-webpack-bundle-analyzer](https://github.com/byzyk/react-app-rewire-webpack-bundle-analyzer) by [@byzyk](https://github.com/byzyk)
* [react-app-rewire-unplug](https://github.com/sigged/react-app-rewire-unplug) by [@sigged](https://github.com/sigged)
* [react-app-rewire-compression-plugin](https://github.com/ArVan/react-app-rewire-compression-plugin) by [@ArVan](https://github.com/ArVan)
* [react-app-rewire-multiple-entry](https://github.com/Derek-Hu/react-app-rewire-multiple-entry) by [@Derek](https://github.com/Derek-Hu)

## Loaders
* [react-app-rewire-postcss](https://github.com/csstools/react-app-rewire-postcss)
* [react-app-rewire-nearley](https://github.com/lwd-technology/react-app-rewire-nearley) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-coffeescript](https://github.com/stevefan1999/react-app-rewire-coffeescript) by [@stevefan1999](https://github.com/stevefan1999)
* [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-typescript-babel-preset](https://github.com/strothj/react-app-rewire-typescript-babel-preset) by [@strothj](https://github.com/strothj)
* [react-app-rewire-css-modules](https://github.com/codebandits/react-app-rewire-css-modules) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-css-modules-extensionless](https://github.com/moxystudio/react-app-rewire-css-modules-extensionless) by [@moxystudio](https://github.com/moxystudio)
* [react-app-rewire-less-modules](https://github.com/andriijas/react-app-rewire-less-modules) by [@andriijas](https://github.com/andriijas)
* [react-app-rewire-stylus-modules](https://github.com/marcopeg/react-app-rewire-stylus-modules) by [@marcopeg](https://github.com/marcopeg)
* [react-app-rewire-svg-react-loader](https://github.com/codebandits/react-app-rewire-svg-react-loader) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-bem-i18n-loader](https://github.com/maxvipon/react-app-rewire-bem-i18n-loader) by [@maxvipon](https://github.com/maxvipon)
* [react-app-rewire-babel-loader](https://github.com/dashed/react-app-rewire-babel-loader) by [@dashed](https://github.com/dashed)
* [react-app-rewire-svgr](https://github.com/gitim/react-app-rewire-svgr) by [@gitim](https://github.com/gitim)
* [react-app-rewire-yaml](https://github.com/hsz/react-app-rewire-yaml) by [@hsz](https://github.com/hsz)
* [react-app-rewire-scss](https://github.com/aze3ma/react-app-rewire-scss) by [@aze3ma](https://github.com/aze3ma)
* [react-app-rewire-external-svg-loader](https://github.com/moxystudio/react-app-rewire-external-svg-loader) by [@moxystudio](https://github.com/moxystudio)
* [react-app-rewire-typings-for-css-module](https://github.com/rainx/react-app-rewire-typings-for-css-module) by [@rainx](https://github.com/rainx)

## Other

* [react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-react-library](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-vendor-splitting](https://github.com/andriijas/react-app-rewire-vendor-splitting) by [@andriijas](https://github.com/andriijas)
* [react-app-rewired with Inferno](packages/react-app-rewired/examples/inferno.md)
* [react-app-rewired with react-styleguideist](packages/react-app-rewired/examples/react-styleguidist.md)
* [react-app-rewired with react-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader) by [@cdharris](https://github.com/cdharris)
* [react-app-rewire-alias](https://github.com/oklas/react-app-rewire-alias) by [@oklas](https://github.com/oklas)
* [react-app-rewire-aliases](https://github.com/aze3ma/react-app-rewire-aliases) by [@aze3ma](https://github.com/aze3ma)
* [react-app-rewire-blockstack](https://github.com/harrysolovay/react-app-rewire-blockstack) by [@harrysolovay](https://github.com/harrysolovay)
* [ideal-rewires](https://github.com/harrysolovay/ideal-rewires) by [@harrysolovay](https://github.com/harrysolovay)
* [react-app-rewire-yarn-workspaces](https://github.com/viewstools/yarn-workspaces-cra-crna/tree/master/react-app-rewire-yarn-workspaces) by [@viewstools](https://github.com/viewstools)

# Development

When developing this project, ensure you have [yarn](https://yarnpkg.com/en/docs/install) installed.

## Quick Start
To run the test app, navigate to the directory and run:

```bash
yarn setup
yarn start
```

(when you are finished, run `yarn teardown` to clean up)

## Commands
Here is a list of all the available commands to help you in development

- `yarn setup` - installs dependences and links `test/react-app`
- `yarn start` - starts the react app
- `yarn build` - builds the react app
- `yarn test` - tests the react app
- `yarn teardown` - unlinks `test/react-app` and removes dependencies

# Why This Project Exists

See: [Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


