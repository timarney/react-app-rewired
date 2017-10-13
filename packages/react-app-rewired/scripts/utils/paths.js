var path = require('path');
var fs = require('fs');

//try to detect if user is using a custom scripts version
var custom_scripts = false;
const cs_index = process.argv.indexOf('--scripts-version');

if (cs_index > -1 && cs_index + 1 <= process.argv.length) {
  custom_scripts = process.argv[cs_index + 1];
}

const scriptVersion = custom_scripts || 'react-scripts';
const projectDir = path.resolve(fs.realpathSync(process.cwd()));

const paths = require(scriptVersion + '/config/paths');

module.exports = Object.assign({
  scriptVersion: scriptVersion,
  configOverrides: projectDir + '/config-overrides',
  customScriptsIndex: (custom_scripts ? cs_index : -1)
}, paths);
