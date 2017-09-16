/* DEFAULT */
module.exports = function override(config, env) {
  /* Modify the config as needed*/
  return config;
};
/* ALTERNATIVE */
/*
module.exports = {
  webpack: function (config, env) {
    return config;
  },
  jest: function (config) {
    return config;
  },
  // configFunction is the original react-scripts function that creates the
  // Webpack Dev Server config based on the settings for proxy/allowedHost.
  // react-scripts injects this into your function (so you can use it to
  // create the standard config to start from), and needs to receive back a
  // function that takes the same arguments as the original react-scripts
  // function so that it can be used as a replacement for the original one.
  devServer: function (configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // Edit config here - example: set your own certificates.
      //
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // };
      
      return config;
    };
  }
}
*/
