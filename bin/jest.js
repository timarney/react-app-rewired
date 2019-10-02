#!/usr/bin/env node

/*!
 * This file is necessary to allow usage of react-app-rewired as a drop-in replacement
 * for react-scripts with WebStorms's test runner UI.
 *
 * For more information, see https://github.com/timarney/react-app-rewired/issues/182
 */

const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2);

// ignore --config param like it was never there
// (react-scripts adds it too and we override configuration anyway)
const configIndex = args.findIndex(x => x === '--config');
if (!!~configIndex) args.splice(configIndex, 2);

// Alternatively could be detected by presence of _INTELLIJ_JEST_CONFIG_ROOT_DIR env variable
const setupScriptFileIndex = args.findIndex(x => x === '--setupTestFrameworkScriptFile') + 1;
const isIntelliJ = !setupScriptFileIndex ? false :
    args[setupScriptFileIndex].indexOf('jest-intellij-jasmine.js') !== -1;

const result = spawn.sync(
    process.argv[0],
    [].concat(
        require.resolve('../scripts/test'),
        args
    ), {
        stdio: 'inherit',
        env: Object.assign({}, process.env, isIntelliJ ? { CI: 1 } : null)
    }
);

process.exit(result.signal ? 1 : result.status);
