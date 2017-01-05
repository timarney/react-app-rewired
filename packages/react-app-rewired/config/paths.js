const path = require('path');
const fs = require('fs');
const scriptVersion = process.argv[2] || 'react-scripts';
const projectDir = path.resolve(fs.realpathSync(process.cwd()));
const scriptVersionDir = path.join(projectDir, 'node_modules', scriptVersion);

module.exports = {
    scriptVersion,
    projectDir,
    scriptVersionDir,
};