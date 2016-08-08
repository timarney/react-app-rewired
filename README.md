# First Things First

Create React App is an amazing tool, it's great and it covers a lot of ground.

The "eject" feature makes a ton of sense, it allows you to power up and go further.

**Sometimes you might need a tiny bit more i.e. canadian-stylesheets**

It would be nice to be able to modify the config (I totally understand why the project doesn't want to go this route).  Allowing custom configs would likley flood the project with unrelated issues.

So lets hack it and get ourselves some Canadian stylesheets (or whatever else you want).

#Try it
npm run override


#Modify it
just update the start.js file
```
var rewire = require("rewire")
process.env.PORT = false;

//load the real start sript via rewire
var defaults = rewire('react-scripts/scripts/start.js')

//PostCSS plugins
var autoprefixer = require('autoprefixer')
var eh = require('postcss-canadian-stylesheets')

//setup the PostCSS we want to use
defaults.__set__("autoprefixer", autoprefixer)
defaults.__set__("eh", eh)

//get the default webpack config
var config = defaults.__get__("config")

//mod the PostCSS setup
config.postcss = function() {
    return [autoprefixer, eh];
}

//override the default config
defaults.__set__("config", config)
```

#Have Fun