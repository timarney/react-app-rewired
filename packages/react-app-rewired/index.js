const paths = require('./scripts/utils/paths');

function deprecate(helper) {
  throw new Error(`The "${helper}" helper has been deprecated as of v2.0. You can use customize-cra plugins in replacement - https://github.com/arackaf/customize-cra#available-plugins`);
}

module.exports = {
  getLoader: function() {
    return deprecate('getBabelLoader');
  },
  loaderNameMatches: function() {
    return deprecate('loaderNameMatches');
  },
  getBabelLoader: function() {
    return deprecate('getBabelLoader');
  },
  injectBabelPlugin: function() {
    return deprecate('injectBabelPlugin');
  },
  compose: function() {
    return deprecate('compose');
  },
  paths
};
