 <img alt="react-app-rewired" src="./assets/react-app-rewired.png" />

# Rewire Your App

Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.

All the benefits of create-react-app without the limitations of "no config". You can add plugins, loaders whatever you need.

> All you have to do is create your app using [create-react-app](https://github.com/facebookincubator/create-react-app) and then rewire it.

⚠️ **Please Note:**

> By doing this you're breaking the ["guarantees"](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710) that CRA provides. That is to say you now "own" the configs. **No support** will be provided. Proceed with caution.

# How to rewire your create-react-app project


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

#### 3) 'Flip' the existing the `npm run` scripts for start and build
```json
/* package.json */

"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build"
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
