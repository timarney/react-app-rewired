/* config-overrides.js */
module.exports = function override(config, env) {
  var loader = '';
  if (env === 'development') {
    loader = 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';
  } else {
    loader = 'style!css?modules&-autoprefixer&importLoaders=1!postcss';
  }
  // Find the right loader then patch its 'loader' property
  config.module.loaders.forEach(l => {
    if (String(l.test) == String(/\.css$/)) l.loader = loader
  })
  // default override
  return config;
}