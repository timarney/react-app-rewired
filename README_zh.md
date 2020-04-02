> ℹ️
请在提 issue 之前确保 **issue 是关于项目代码**，而不是 **我要怎么配置 Webpack**。（配置相关的问题可以在 Stack Overflow 或者 Spectrum 上提问）。

- 🚨 2.0版本移除了rewire helper 功能

[![npm version](https://img.shields.io/npm/v/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-app-rewired.svg)](https://www.npmjs.com/package/react-app-rewired)

 <img alt="react-app-rewired" src="https://github.com/timarney/react-app-rewired/raw/master/assets/react-app-rewired.png" />

此工具可以在不 'eject' 也不创建额外 react-scripts 的情况下修改 create-react-app 内置的 webpack 配置，然后你将拥有 create-react-app 的一切特性，且可以根据你的需要去配置 webpack 的 plugins, loaders 等。

# Rewire你的应用 ☠
从 Create React App 2.0开始，这个仓库主要由社区“轻度”维护。

⚠️ **注意**

> 使用了 react-app-rewired 之后，等于你得到了项目的配置权，但这表示你的项目将无法得到 CRA 提供的配置“[保证](https://github.com/facebookincubator/create-react-app/issues/99#issuecomment-234657710)”，希望你知道自己要做什么。

"Stuff can break" — Dan Abramov https://twitter.com/dan_abramov/status/1045809734069170176

<hr>

**注意:** 我个人使用[next.js](https://github.com/zeit/next.js/) 或者 [Razzle](https://github.com/jaredpalmer/razzle) 都支持开箱即用的自定义 Webpack。

## 备选方案

您可以尝试使用 [custom -cra](https://github.com/arackaf/customize-cra) 来获得一组 CRA 2.0兼容的 rewirers，或任何旨在支持2.0的替代项目和分支：
- [Rescripts](https://github.com/rescripts/rescripts)，用于扩展 CRA 配置的替代框架（支持2.0+）
- [react-scripts-rewired](https://github.com/marcopeg/create-react-app/blob/master/packages/react-scripts/README.md) 为该项目的一个分支，旨在支持 CRA 2.0
- [craco](https://github.com/sharegate/craco)

# 如何rewire create-react-app项目
> 使用 [create-react-app](https://github.com/facebookincubator/create-react-app) 创建您的应用，然后 rewire

#### 1) 安装 react-app-rewired

##### 对于使用 Webpack 4 的 create-react-app 2.x

```bash
$ npm install react-app-rewired --save-dev
```

##### 对于 create-react-app 1.x 或 react-scripts-ts 与 Webpack 3：
```bash
$ npm install react-app-rewired@1.6.2 --save-dev
```

#### 2) 在根目录中创建一个 config-overrides.js 文件

```javascript
/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```

 #### 3) 替换 package.json 中 scripts 执行部分

```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}
```
 注意：不用替换 `eject` 部分。工具中没有针对 `eject` 的配置替换，执行了 eject 命令会让工具失去作用（能找到这个插件我也相信你知道 eject 是干嘛的）。

#### 4) 启动 Dev Server

```bash
$ npm start
```

#### 5) 构建你的应用程序

```bash
$ npm run build
```

## 扩展配置选项
您可以为其设置自定义路径 `config-overrides.js`
 如果您想要使用在 `node_modules` 中的第三方 config-overrides.js，您可以将以下内容添加到您的`package.json`：


```json
"config-overrides-path": "node_modules/some-preconfigured-rewire"
```

默认情况下，该 `config-overrides.js` 文件导出单个函数，以便在开发或生产模式下自定义 webpack 配置, 方便编译您的 react 应用程序。可以从该文件中导出一个包含最多三个字段的对象，每个字段都是一个函数。这种替代形式允许您自定义用于 Jest（在测试中）和 Webpack Dev Server 本身的配置。
此示例实现用于演示使用每个对象需要的函数。在此示例中，展示的功能是：
* 根据 `.env` 变量有条件地运行一些测试
* 设置用于 Development Server 的 https 证书，`.env` 文件变量中指定的文件名。

```javascript
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
    return config;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function(config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    if (!config.testPathIgnorePatterns) {
      config.testPathIgnorePatterns = [];
    }
    if (!process.env.RUN_COMPONENT_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
    }
    if (!process.env.RUN_REDUCER_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    }
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      const fs = require('fs');
      config.https = {
        key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
        cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
        ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
        passphrase: process.env.REACT_HTTPS_PASS
      };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) {
    // ...add your paths config
    return paths;
  },
}
```

#### 1) Webpack 配置 - 开发和生产

该 `webpack` 字段用于提供与 config-overrides.js 导出的单个函数的等效项。这是使用所有常用 rewire 的地方。它无法在测试模式下配置编译，因为测试模式根本无法通过 Webpack 运行（它在 Jest 中运行）。它也不能用于自定义用于在开发模式下提供页面的 Webpack Dev Server，因为 create-react-app 生成一个单独的 Webpack 配置，以便与使用不同函数和默认配置的 dev 服务器一起使用。

#### 2) Jest 配置 - 测试

Webpack 不用于在测试模式下编译应用程序 - 而是使用 Jest。这意味着您的 webpack 配置自定义函数中指定的任何重连接*都不会在*测试模式下应用于您的项目。

React-app-rewired 自动允许您在文件的某个 `jest` 部分自定义 Jest 配置 `package.json`，包括允许您设置在 create-react-app 通常会阻止您进行设置的配置字段。它还会自动设置 Jest，以便在运行测试之前使用 Babel 编译项目。Jest 的配置选项在 [Jest 网站](https://facebook.github.io/jest/docs/en/configuration.html)上单独记录。*注意*：配置数组和对象是合并的，而不是被覆盖。有关详细信息，请参阅[＃240](https://github.com/timarney/react-app-rewired/issues/240)和[＃241](https://github.com/timarney/react-app-rewired/issues/241)

如果想要将 Jest 插件或预设添加到 Babel 配置中，则需要在 `package.json` 文件内部里的`babel`定义关于这些插件/预设。或者是在 `.babelrc` 中去定义。React-app-rewired 改变了 Jest 配置，以便在 Jest 编译您的 react 应用程序时使用这些定义文件来指定 Babel 选项。在 [Babel 网站](https://babeljs.io/docs/usage/babelrc/)上单独记录了在 `package.json` 的 Babel 部分中或 `.babelrc` 使用的格式。

`jest` 在 module.exports 对象中的字段 `config-overrides.js` 用于指定可以调用的函数，以便以 package.json 文件的 jest 部分中不能的方式自定义 Jest 测试配置。例如，它允许您根据环境变量更改某些配置选项。此函数作为参数传递默认的 create-react-app Jest 配置，并且需要返回要使用的已修改的Jest配置。很多时候你只需要使用 package.json 文件的 jest 部分和 `.babelrc` 文件（或 `package.json` 中的 babel 部分）的组合就可以进行配置更改，而不需要提供这个 jest 函数 `config-overrides.js`

#### 3) Webpack Dev Server

在开发模式下运行时，create-react-app 不会为 Development Server（提供应用程序页面的服务器）使用常用 Webpack 配置。这意味着您无法使用服务器的常规 `webpack` 在`config-overrides.js` 中的部分来更改 Development Server 设置，因为这些更改将不会应用。

与此相反，create-react-app 期望能够在需要时调用函数来生成 webpack dev 服务器。此函数提供了在 webpack dev 服务器中使用的 proxy 和 allowedHost 设置的参数（create-react-app 从package.json 文件中检索这些参数的值）。

React-app-rewired 提供了通过使用在 `config-overrides.js` 文件里 module.exports 出的对象 `devServer` 来覆盖此函数。它为 devServer 函数提供了一个包含默认 create-react-app 函数的参数，该函数通常用于生成 dev server 配置（它不能提供生成的配置版本，因为 react-scripts 直接调用生成函数）。React-app-rewired 需要接收 create-react-app 的*替换函数*作为返回值，然后用于生成 Development Server 配置（即返回值应该是一个新函数，它接受 proxy 和 allowedHost 的两个参数和本身作为参数，并返回 Webpack Development Server 配置）。原始的 react-scripts 函数被传递给`config-overrides.js` 中 devServer 函数，以便您可以自己轻松调用此方法，根据 create-react-app 使用的默认值生成初始 devServer 配置。

#### 4) 路径配置 - 开发&生产

该 `paths` 字段用于为 `create-react-app` 传递到 webpack 和 jest 的路径提供覆盖。

#### 5) 为第三方工具提供 rewired 的 webpack 配置

一些第三方工具，比如 [react-cosmos](https://github.com/react-cosmos/react-cosmos) 依赖于你的 webpack 配置。您可以创建 `webpack.config.js` 文件，通过下列代码导出 rewired 配置：

```js
const { paths } = require('react-app-rewired');
// require normalized overrides
const overrides = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config.dev');

module.exports = overrides.webpack(config, process.env.NODE_ENV);
```

然后在工具配置中指向此文件。

## 其他问题和选择
#### 1) 入口: 'src/index.js'

此时，由于 create-react-app 包含该文件的方式，很难从默认文件 `src/index.js` 更改入口点。几个 create-react-app 脚本绕过了正常的 rewiring 过程。

这里有三种解决方法：

1. 只需要从 src / index.js 文件中输入/导入所需的文件，例如：
```javascript
require('./index.tsx');
```
2. 使用自定义版本的 react-scripts 包来更改脚本本身内部的入口点 (例如. [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript) 对于typescript项目 - 请参阅下面有关如何使用 react-app-rewired 的自定义脚本版本).
3. 重写 `react-dev-utils/checkRequiredFiles` 函数以始终返回 true（导致 create-react-app 不再尝试强制条目文件必须存在）

#### 2) 自定义脚本版本
`react-scripts` 通过在命令行选项中指定脚本包的名称 `--scripts-version` 或 `REACT_SCRIPTS_VERSION=<...>` 通过环境进行设置，可以使用自定义版本的包和react-app-rewired。


使用脚本版本选项的工作示例是：

```json
{
  "scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --scripts-version react-scripts-ts --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

##### React-app-rewired 2.x 需要一个自定义的 react-scripts 包来提供以下文件：
* config/env.js
* **config/webpack.config.js**
* config/webpackDevServer.config.js
* scripts/build.js
* scripts/start.js
* scripts/test.js
* scripts/utils/createJestConfig.js

##### React-app-rewired 1.x 需要一个自定义的 react-scripts 包来提供以下文件：
* config/env.js
* **config/webpack.config.dev.js**
* **config/webpack.config.prod.js**
* config/webpackDevServer.config.js
* scripts/build.js
* scripts/start.js
* scripts/test.js
* scripts/utils/createJestConfig.js

#### 3) 将 config-overrides 指定为目录

React-app-rewired 会导入您的 config-overrides.js 文件而不使用 “.js” 扩展名。这意味着您可以选择创建一个名为 `config-overrides` 的目录在你的根目录中，并从该 `index.js` 目录中的默认文件中导出覆盖。

如果使用目录有多个自定义覆盖，则允许您将每个覆盖放在单独的文件中。演示这一点的示例模板可以在 Github 的 [Guria / rewired-ts-boilerplate](https://github.com/Guria/rewired-ts-boilerplate/tree/master/config-overrides) 中找到。

#### 4) 从命令行指定config-overrides位置

如果需要更改 config-overrides.js 的位置，可以将命令行选项 --config-overrides<path> 给 react-app-rewired 脚本。


# 版本1.X社区维护 Rewires（检查插件仓库是否支持2.0）

## Babel 插件
* [react-app-rewire-emotion](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-emotion) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-lodash](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-lodash) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-styled-components](https://github.com/withspectrum/react-app-rewire-styled-components) by [@mxstbr](https://github.com/mxstbr)
* [react-app-rewire-polished](https://github.com/rawrmonstar/react-app-rewire-polished) by [@rawrmonstar](https://github.com/rawrmonstar)
* [react-app-rewire-idx](https://github.com/viktorivarsson/react-app-rewire-idx) by [@viktorivarsson](https://github.com/viktorivarsson)
* [react-app-rewire-glamorous-displayname](https://github.com/CarlRosell/react-app-rewire-glamorous-displayname) by [@CarlRosell](https://github.com/CarlRosell)
* [react-app-rewire-import](https://github.com/brianveltman/react-app-rewire-import) by [@brianveltman](https://github.com/brianveltman)
* [react-app-rewire-inline-import-graphql-ast](https://github.com/detrohutt/react-app-rewire-inline-import-graphql-ast) by [@detrohutt](https://github.com/detrohutt)
* [react-app-rewire-react-intl](https://github.com/clemencov/react-app-rewire-react-intl) by [@clemencov](https://github.com/clemencov)
* [react-app-rewire-lingui](https://github.com/Andreyco/react-app-rewire-lingui) by [@andreyco](https://github.com/Andreyco)
* [react-app-rewire-date-fns](https://github.com/stk-dmitry/react-app-rewire-date-fns) by [@stk-dmitry](https://github.com/stk-dmitry)

## Webpack 插件

* [react-app-rewire-appcache-plugin](https://github.com/lwd-technology/react-app-rewire-appcache-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-build-dev](https://github.com/raodurgesh/react-app-rewire-build-dev) by [@raodurgesh](https://github.com/raodurgesh)
* [react-app-rewire-define-plugin](https://github.com/lwd-technology/react-app-rewire-define-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-favicons-plugin](https://github.com/rickycook/react-app-rewire-favicons-plugin) by [@rickycook](https://github.com/rickycook)
* [react-app-rewire-imagemin-plugin](https://github.com/lwd-technology/react-app-rewire-imagemin-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-modernizr](https://github.com/ctrlplusb/react-app-rewire-modernizr) by [@ctrlplusb](https://github.com/ctrlplusb)
* [react-app-rewire-preload-plugin](https://github.com/lwd-technology/react-app-rewire-preload-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-provide-plugin](https://github.com/lwd-technology/react-app-rewire-provide-plugin) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-inline-source](https://github.com/marcopeg/react-app-rewire-inline-source) by [@marcopeg](https://github.com/marcopeg)
* [react-app-rewire-webpack-bundle-analyzer](https://github.com/byzyk/react-app-rewire-webpack-bundle-analyzer) by [@byzyk](https://github.com/byzyk)
* [react-app-rewire-unplug](https://github.com/sigged/react-app-rewire-unplug) by [@sigged](https://github.com/sigged)
* [react-app-rewire-compression-plugin](https://github.com/ArVan/react-app-rewire-compression-plugin) by [@ArVan](https://github.com/ArVan)

## Loaders
* [react-app-rewire-postcss](https://github.com/csstools/react-app-rewire-postcss)
* [react-app-rewire-nearley](https://github.com/lwd-technology/react-app-rewire-nearley) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-coffeescript](https://github.com/stevefan1999/react-app-rewire-coffeescript) by [@stevefan1999](https://github.com/stevefan1999)
* [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript) by [@jtheis85](https://github.com/jtheis85)
* [react-app-rewire-typescript-babel-preset](https://github.com/strothj/react-app-rewire-typescript-babel-preset) by [@strothj](https://github.com/strothj)
* [react-app-rewire-css-modules](https://github.com/codebandits/react-app-rewire-css-modules) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-css-modules-extensionless](https://github.com/moxystudio/react-app-rewire-css-modules-extensionless) by [@moxystudio](https://github.com/moxystudio)
* [react-app-rewire-less-modules](https://github.com/andriijas/react-app-rewire-less-modules) by [@andriijas](https://github.com/andriijas)
* [react-app-rewire-stylus-modules](https://github.com/marcopeg/react-app-rewire-stylus-modules) by [@marcopeg](https://github.com/marcopeg)
* [react-app-rewire-svg-react-loader](https://github.com/codebandits/react-app-rewire-svg-react-loader) by [@lnhrdt](https://github.com/lnhrdt)
* [react-app-rewire-bem-i18n-loader](https://github.com/maxvipon/react-app-rewire-bem-i18n-loader) by [@maxvipon](https://github.com/maxvipon)
* [react-app-rewire-babel-loader](https://github.com/dashed/react-app-rewire-babel-loader) by [@dashed](https://github.com/dashed)
* [react-app-rewire-svgr](https://github.com/gitim/react-app-rewire-svgr) by [@gitim](https://github.com/gitim)
* [react-app-rewire-yaml](https://github.com/hsz/react-app-rewire-yaml) by [@hsz](https://github.com/hsz)
* [react-app-rewire-scss](https://github.com/aze3ma/react-app-rewire-scss) by [@aze3ma](https://github.com/aze3ma)
* [react-app-rewire-external-svg-loader](https://github.com/moxystudio/react-app-rewire-external-svg-loader) by [@moxystudio](https://github.com/moxystudio)
* [react-app-rewire-typings-for-css-module](https://github.com/rainx/react-app-rewire-typings-for-css-module) by [@rainx](https://github.com/rainx)

## 其他

* [react-app-rewire-create-react-library](https://github.com/osdevisnot/react-app-rewire-create-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-react-library](https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library) by [@osdevisnot](https://github.com/osdevisnot)
* [react-app-rewire-vendor-splitting](https://github.com/andriijas/react-app-rewire-vendor-splitting) by [@andriijas](https://github.com/andriijas)
* [react-app-rewired with Inferno](packages/react-app-rewired/examples/inferno.md)
* [react-app-rewired with react-styleguideist](packages/react-app-rewired/examples/react-styleguidist.md)
* [react-app-rewired with react-hot-loader](https://github.com/cdharris/react-app-rewire-hot-loader) by [@cdharris](https://github.com/cdharris)
* [react-app-rewire-alias](https://github.com/oklas/react-app-rewire-alias) by [@oklas](https://github.com/oklas)
* [react-app-rewire-aliases](https://github.com/aze3ma/react-app-rewire-aliases) by [@aze3ma](https://github.com/aze3ma)
* [react-app-rewire-blockstack](https://github.com/harrysolovay/react-app-rewire-blockstack) by [@harrysolovay](https://github.com/harrysolovay)
* [ideal-rewires](https://github.com/harrysolovay/ideal-rewires) by [@harrysolovay](https://github.com/harrysolovay)
* [react-app-rewire-yarn-workspaces](https://github.com/viewstools/yarn-workspaces-cra-crna/tree/master/react-app-rewire-yarn-workspaces) by [@viewstools](https://github.com/viewstools)

# 开发

在开发此项目时，请确保已安装 [yarn](https://yarnpkg.com/en/docs/install) 

## 快速开始
要运行测试应用程序，请进入到该目录并运行：

```bash
yarn setup
yarn start
```

( 当你结束时，可以通过运行 yarn teardown 清理 )

## 命令
以下列出了可帮助您进行开发的所有可用命令

- `yarn setup` - installs dependences and links `test/react-app`
- `yarn start` - starts the react app
- `yarn build` - builds the react app
- `yarn test` - tests the react app
- `yarn teardown` - unlinks `test/react-app` and removes dependencies

# 为什么这个项目存在

参阅：[Create React App — But I don’t wanna Eject.](https://medium.com/@timarney/but-i-dont-wanna-eject-3e3da5826e39#.x81bb4kji)


