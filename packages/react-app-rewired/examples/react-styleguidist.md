## Getting Started with Styleguidist

Styleguidist combines a style guide, where all your components are presented on a single page with their props documentation and usage examples, with an environment for developing components in isolation, similar to Storybook. In Styleguidist you write examples in Markdown, where each code snippet is rendered as a live editable playground.

First, install Styleguidist:

```sh
npm install --save react-styleguidist
```

Alternatively you may use `yarn`:

```sh
yarn add react-styleguidist
```

Then, add these scripts to your `package.json`:

```diff
   "scripts": {
+    "styleguide": "styleguidist server",
+    "styleguide:build": "styleguidist build",
     "start": "react-scripts start",
```

Styleguidist works out of the box with `create-react-app` but since you are using `react-app-rewired` we need to point Styleguidist to our rewired webpack config. In your project root create file named `styleguide.config.js` and put the following content in:

```javascript
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const paths = require("react-app-rewired/scripts/utils/paths");
require(paths.scriptVersion + "/config/env");

const webpackConfig = (process.env.NODE_ENV === 'production')
    ? paths.scriptVersion + '/config/webpack.config.prod'
    : paths.scriptVersion + '/config/webpack.config.dev';
    
const config = require(webpackConfig);
const override = require(paths.configOverrides);
const overrideFn =
  typeof override === "function"
    ? override
    : override.webpack || ((config, env) => config);

module.exports = {
  webpackConfig: overrideFn(config, process.env.NODE_ENV),
};
```

Thats it, we are ready to launch our styleguide. Run the following command inside your app’s directory:

```sh
npm run styleguide
```

After that, follow the instructions on the screen.

Learn more about React Styleguidist:

* [GitHub Repo](https://github.com/styleguidist/react-styleguidist)
* [Documentation](https://react-styleguidist.js.org/docs/getting-started.html)

Guide built upon:

* [create-react-app#getting-started-with-styleguidist](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#getting-started-with-styleguidist)
