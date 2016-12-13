#Install

```bash
$ npm install --save react-app-rewire-sass
```

#Add it to your project

```javascript
const rewireSass = require('react-app-rewire-sass');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireSass(config, env);
  return config;
}
```