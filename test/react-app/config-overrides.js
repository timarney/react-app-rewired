const {
  override,
} = require('customize-cra');

// override
module.exports = {
  webpack: override(
    // customize-cra plugins here

    (config) => {
      return config;
    },
  ),

  jest: config => {
    return config;
  },

  devServer: async configFunction => {

    //call your awaitable methods here
    const result = await Promise.resolve('do something async');
    console.log(result);

    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      //do something with result
      return config;
    }
  },
  paths: (paths, env) => {
    return paths;
  }
};