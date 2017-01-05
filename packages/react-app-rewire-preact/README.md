#Rewire create-react-app to use Preact


#Install

```bash
$ npm install --save react-app-rewire-preact
```

#Add it to your project

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
const rewirePreact = require('react-app-rewire-preact');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewirePreact(config, env);
  return config;
}
```