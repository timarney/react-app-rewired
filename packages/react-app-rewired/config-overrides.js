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
  }
}
*/