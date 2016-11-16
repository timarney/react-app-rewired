#Preact

**Install Preact**


```
$ npm install preact preact-compat --save
```

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
module.exports = function override(config, env) {
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }

  return config;
}

```

```bash
$ npm run rewire:start
```
