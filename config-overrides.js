/* CSS Modules Loader */
module.exports = function override(config, env) {
  var loader = 'style!css?modules&';
  if (env === 'development') {
    loader += 'importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';
  } else {
    loader += '-autoprefixer&importLoaders=1!postcss';
  }
  // Find the right loader then patch its 'loader' property
  config.module.loaders.forEach(l => {
    if (String(l.test) == String(/\.css$/)) l.loader = loader
  })
 
  return config;
}
