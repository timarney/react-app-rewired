Create your React app using `create-react-app my-app` or use an CRA app


#Rewire it
####1) Install react-app-rewired + react-app-rewire-preact
```bash
npm install react-app-rewired react-app-rewire-preact --save
```

#### 2) Create a config-overrides.js file in the root directory

```javascript
const rewirePreact = require('react-app-rewire-preact');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewirePreact(config, env);
  return config;
}

```
**Sample Structure**
```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```

#### 3) 'Flip' the existing the npm run scripts for start and build
```
/* package.json */

"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build"
  }
```
#### 4) Start the Dev Server

```bash
$ npm run build
```  
