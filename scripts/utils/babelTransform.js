const { dependRequire, dependRequireResolve } = require('./dependRequire');

const babelJestMd = dependRequire('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = babelJest.createTransformer({
  presets: [
    [
      dependRequireResolve('babel-preset-react-app'),
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ]
  ],
  plugins: [],
  babelrc: true
});
