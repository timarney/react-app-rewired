var path = require('path');
var fs = require('fs');

//try to detect if user is using a custom scripts version
var custom_scripts = false;
const cs_index = process.argv.indexOf('--scripts-version');

if (cs_index > -1 && cs_index + 1 <= process.argv.length) {
  custom_scripts = process.argv[cs_index + 1];
}

const scriptVersion = custom_scripts || 'react-scripts';
const modulePath = path.join(
  require.resolve(`${scriptVersion}/package.json`),
  '..'
);
const projectDir = path.resolve(fs.realpathSync(process.cwd()));

const paths = require(modulePath + '/config/paths');

module.exports = Object.assign({
  scriptVersion: modulePath,
  configOverrides: projectDir + '/config-overrides',
  customScriptsIndex: (custom_scripts ? cs_index : -1)
}, paths);
