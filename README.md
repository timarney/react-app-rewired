 <img alt="react-app-rewired" src="./assets/react-app-rewired.png" />

# Rewire Your App

Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.  

All the benefits of create-react-app without the limitations of "no config".  You can add plugins, loaders whatever you need.

> All you have to do is create your app using [create-react-app](https://github.com/facebookincubator/create-react-app) and than rewire it.

⚠️ **Please Note:**  

> By doing this your breaking ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides.  That is to say you now "own" the configs. **No support** will be provided.  Proceed with caution.

#How to rewire your create-react-app project


#### 1) Install react-app-rewired 
```bash
$ npm install react-app-rewired --save
``` 

#### 2) Create a `config-overrides.js` file in the root directory

```javascript
/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config... 
  return config;
}
```
View the [examples](https://github.com/timarney/react-app-rewired/tree/master/examples) -> CSS Modules, Preact, Inferno, Sass etc...

```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```



#### 3) Add the the `npm run` scripts
```json
/* package.json */

"scripts": {
    "rewire:start": "node ./node_modules/react-app-rewired/scripts/start",
    "rewire:build": "node ./node_modules/react-app-rewired/scripts/build"
  }
```

#### 4) Start the Dev Server or Build your app using the rewired config
```bash
$ npm run rewire:start
```

```bash
$ npm run rewire:build
```
