# First Things First

Create React App (https://github.com/facebookincubator/create-react-app) is an amazing tool with sensible defaults. 

That said, I for one would line to be able to tweak the webpack config without needing to 'eject' in turn losing all the benefits of the project (future updates etc...).

Case in point -> **I want to add a PostCSS plugin** (canadian-stylesheets)

Our options:
```
1. Abandon the dream of using canadian-stylesheets and settle for the defaults
2. `npm run eject`
3. Hack the Config! and get ourselves some Canadian stylesheets (or whatever else you want)
```

#Lets hack the config
```
module.exports = function override (config) {
  config.postcss = function () {
    var autoprefixer = require('autoprefixer')
    var eh = require('postcss-canadian-stylesheets')
    return [autoprefixer, eh]
  }
  return config
}
```

#Try it
npm run start or npm run build

#Have Fun
Modify config-overrides.js

Note: I totally understand why the project doesn't want to go this route.  Allowing custom configs would likely flood the project with unrelated issues.
