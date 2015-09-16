'use strict';
//include gulp itself
var gulp = require('gulp');

//include required plugins
var gutil = require('gulp-util');
// https://github.com/nwjs/nw-builder
var NwBuilder = require('nw-builder');


gulp.task('build', function () {

    var nw = new NwBuilder({
        appName: null,
        appVersion: null,
        buildType: 'versioned',
        macCredits: 'resources/osx/credits.html',
        macIcns: false,
        macPlist: false,
        winIco: false,
        version: '0.12.3', //nw.js version number, using stable
        files: ['app/**/*.*'], //files to include in build
        platforms: ['win32'] // ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']
    });

    // logging all messages
    nw.on('log', function (msg) {
        gutil.log('nw-builder', msg);
    });

    // log success and fail events
    nw.build().then(function () {
        gutil.log('nw-builder', gutil.colors.green('All done !'));
    }).catch(function (error) {
        gutil.log('nw-builder', gutil.colors.red(error));
    });

});


// define default gulp task
gulp.task('default', ['build']);
