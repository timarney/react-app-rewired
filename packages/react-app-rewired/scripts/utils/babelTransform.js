// TODO: remove file in major release
const babelJest = require('babel-jest');

const customPlugins = [];
try {
  const decoratorsPluginPath = require.resolve('babel-plugin-transform-decorators-legacy');
  customPlugins.push(decoratorsPluginPath);
  console.log('⚡ Rewired added babel-plugin-transform-decorators-legacy');
} catch (e) {
  //do nothing plugin not found
}

module.exports = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-react-app')],
  plugins: customPlugins,
  babelrc: true
});
