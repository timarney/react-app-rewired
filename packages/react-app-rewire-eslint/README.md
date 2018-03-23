# Create your React app using `create-react-app my-app` or use an CRA app

# Rewire it

## 1) Install react-app-rewired + react-app-rewire-eslint

```bash
npm install react-app-rewired react-app-rewire-eslint --save
```

## 2) Create a config-overrides.js file in the root directory

```javascript
const rewireEslint = require('react-app-rewire-eslint');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireEslint(config, env, overrideEslintOptions);
  return config;
}
```

Note that the `overrideEslintOptions` argument is optional.  It allows you to make additional changes to the eslint options that are not made already by `rewireEslint`.

## 3) Create your own .eslintrc in the root directory

**Sample Structure**

```
+-- your-project
|   +-- .eslintrc
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```
