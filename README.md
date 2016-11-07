# First Things First

Create React App (https://github.com/facebookincubator/create-react-app) is an amazing tool with sensible defaults.

That said, I for one would line to be able to tweak the webpack config without needing to 'eject' in turn losing all the benefits of the project (future updates etc...).

Case in point -> I want to use **Create React App** with **Preact**  (https://preactjs.com)


#How does this work?

Roughy:

1. The 'rewired' [scripts](https://github.com/timarney/react-app-rewired/tree/master/scripts) grab a copy of create-react-app webpack config(s) and pass it to an override function

2. We setup an override function
```
//config is a copy of the create-react-app webpack config

module.exports = function override (config) {
  //setup preact
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }


  return config
}
```

3. package.json points to the `rewired` scripts which in turn use the react-scripts

 ```
 "scripts": {
    "default": "node node_modules/react-scripts/scripts/build.js",
    "start": "node scripts/start",
    "build": "node scripts/build"
  },
```


#Try it
* Clone the repo
* Modify config-overrides.js
* npm run start or npm run build (for production)
