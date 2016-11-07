# First Things First

Create React App (https://github.com/facebookincubator/create-react-app) is an amazing tool with sensible defaults.

That said, I for one would line to be able to tweak the webpack config without needing to 'eject' in turn losing all the benefits of the project (future updates etc...).

Case in point -> I want to use **Create React App** with **Preact**  (https://preactjs.com)


#How does this work?

Roughy:

* The 'rewired' [scripts](https://github.com/timarney/react-app-rewired/tree/master/scripts) grab a copy of create-react-app webpack config(s) and pass it to an override function

* We setup an override function
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

* `package.json` points to the `rewired` scripts which in turn use the `react-scripts`

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

#Demo links

- So what's the point?

> I can retain full access to react-create-app no fork no using a different boilerplate (i.e. Preact has a starter).  If create-react-app updates I just flip the version #

**Other Wins**

1. in this case `filesize`
2. I can remove the [override](https://github.com/timarney/react-app-rewired/compare/react-compare) and flip back to React

<hr>

* React Version - https://build-slkyvlrtfe.now.sh 47.6 KB 
* Preact Version - https://build-rxknelthvn.now.sh 13.2 KB

Both links built with **Create React App** as a starter

The only difference is I'm `overriding` (hack) the **Create React App** configs to swap from **React** to use **Preact**

```
module.exports = function override (config) {
  // setup Preact
  config.resolve = {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }

  return config
}

```

