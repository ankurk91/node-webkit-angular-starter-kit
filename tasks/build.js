(function () {
    'use strict';

    //@https://github.com/nwjs/nw-builder/

    //include required plugins
    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        NwBuilder = require('nw-builder');

    var nwBuilderOptions  = {
        platforms : ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64'],
        buildType : 'default', // versioned
        version : '0.12.3'
    };

    var paths = {
        dist: ['dist/**/*']
    };

    gulp.task('build', function (cb) {

        var nw = new NwBuilder({
            appName: null,  //auto get from package.json
            appVersion: null, //auto get from package.json
            macCredits: 'resources/osx/credits.html',
            macIcns: 'resources/osx/app-icon.icns',
            macPlist: 'resources/osx/Info.plist',
            //winIco: 'resources/windows/app-icon.ico', //wine should be installed on linux systems to use this option
            version: '0.12.3', //nw.js version number, using stable
            files: paths.dist,
            platforms: ['linux64']
        });

        // logging all messages
        nw.on('log', function (msg) {
            gutil.log('nw-builder :', msg);
        });

        // log success and fail events
        nw.build().then(function () {
            gutil.log('nw-builder :', gutil.colors.green('Build done !'));
        }).catch(function (error) {
            gutil.log('nw-builder :', gutil.colors.red(error));
        });

        cb(null);

    });

})();
