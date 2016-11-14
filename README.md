# First Things First

[Create React App](https://github.com/facebookincubator/create-react-app) is an amazing tool with sensible defaults.

That said, I for one would line to be able to tweak the webpack config without needing to 'eject' in turn losing all the benefits of the project (future updates etc...).  You could also create a fork, but syncing is no fun.

So let's tweak the config.

#How to rewire your create-react-app project

* Copy the config-overrides.js file into your projects root directory
* Tweak this file as needed see examples directory of this repo
* Add the rewire scripts to your package.json
```
"scripts": {
    "rewire:start": "node ./node_modules/react-app-rewired/scripts/start",
    "rewire:build": "node ./node_modules/react-app-rewired/scripts/build"
  }
```

#Commands
npm run rewire:start
npm run rewire:build