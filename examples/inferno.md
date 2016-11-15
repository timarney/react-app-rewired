#Inferno

**Install Inferno**
```npm install inferno inferno-compat --save```

* [Rewire your app](../#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
module.exports = function override(config, env) {
  config.resolve = {
    "alias": {
       'react': 'inferno-compat',
       'react-dom': 'inferno-compat',
       'react-dom/server': 'inferno-compat'
    }
  }

  return config;
}

```

* Done -> **npm run rewire:start**
