(function () {

    'use strict';

    var os = require('os');

    module.exports.os = function () {
        switch (os.platform()) {
            case 'darwin':
                return 'osx';
            case 'win32':
                return 'windows';
            case 'linux':
                return 'linux';

        }
        return 'unsupported';
    };

    module.exports.platform = function () {
        switch (process.platform) {
            case 'darwin':
                return process.arch === 'x64' ? 'osx64' : 'osx32';

            case 'win32':
                return (process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')) ? 'win64' : 'win32';

            case 'linux':
                return process.arch === 'x64' ? 'linux64' : 'linux32';
        }
        return 'unknown';
    };

    module.exports.replace = function (str, patterns) {
        Object.keys(patterns).forEach(function (pattern) {
            var matcher = new RegExp('{{' + pattern + '}}', 'g');
            str = str.replace(matcher, patterns[pattern]);
        });
        return str;
    };

})();


