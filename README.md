# Rewire Your App

Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.  

All the benefits of create-react-app without the limitations of "no config".  You can add plugins, loaders whatever you need.

#How to rewire your create-react-app project

Setup your project using [create-react-app](https://github.com/facebookincubator/create-react-app)

```npm install react-app-rewired --save``` 

Copy the `config-overrides.js` file into the root directory of your project
```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```

Tweak `config-overrides.js` as needed see the [examples](/example)

Add the the `npm run` scripts to your package.json
```
"scripts": {
    "rewire:start": "node ./node_modules/react-app-rewired/scripts/start",
    "rewire:build": "node ./node_modules/react-app-rewired/scripts/build"
  }
```

#Commands
* npm run rewire:start
* npm run rewire:build
