'use strict';

const path = require('path');
const paths = require('./paths');

module.exports = (config) => {
  Object.keys(config.transform).forEach((key) => {
    if (config.transform[key].endsWith('babelTransform.js')) {
      config.transform[key] = path.resolve(__dirname + '/babelTransform.js');
    }
  });
  const overrides = Object.assign({}, require(paths.appPackageJson).jest);

  // Jest configuration in package.json will be added to the the default config
  Object.keys(overrides)
    .forEach(key => {
      //We don't overwrite the default config, but add to each property if not a string
      if(config[key]) {
        if(typeof overrides[key] === 'string') {
          config[key] = overrides[key];
        } else if(Array.isArray(overrides[key])) {          
          if (key === 'transformIgnorePatterns' && Array.isArray(config[key]) && config[key].length) {
              const tIndex = config[key].findIndex((item) => {
                  return item.includes('node_modules');
              });
              if (tIndex !== -1) {
                  config[key].splice(tIndex, 1, `/node_modules/(?!(${jestExtLibs}))`);
              }            
          }else{
              config[key] = overrides[key].concat(config[key]);
          }
        }
        else if(typeof overrides[key] === 'object') {
          config[key] = Object.assign({}, config[key], overrides[key]);
        }
      } else {
        config[key] = overrides[key];
      }
    });
  return config;
};
