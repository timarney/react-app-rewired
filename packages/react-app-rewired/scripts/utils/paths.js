var path = require('path');
var fs = require('fs');

//try to detect if user is using a custom scripts version
var custom_scripts = process.argv.indexOf('--scripts-version');

if (custom_scripts > -1 && custom_scripts + 1 <= process.argv.length) {
  custom_scripts = process.argv[custom_scripts + 1];
} else {
  custom_scripts = false;
}

const scriptVersion = custom_scripts || 'react-scripts';
const projectDir = path.resolve(fs.realpathSync(process.cwd()));

const paths = require(scriptVersion + '/config/paths');

module.exports = Object.assign({
  scriptVersion: scriptVersion,
  configOverrides: projectDir + '/config-overrides'
}, paths);
