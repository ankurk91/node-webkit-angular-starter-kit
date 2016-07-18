'use strict';

//https://github.com/gulpjs/gulp
var gulp = require('gulp'),
    gutil = require("gulp-util"),
    utils = require('./tasks/utility'),
    del = require('del');


require('./tasks/dist.js');
require('./tasks/build.js');


//Note: gulp.start will be removed in gulp v4
gulp.task('release', function () {

    gutil.log('Release :', gutil.colors.blue('Detected Current platform as - ' + utils.platform()));

    if (utils.platform() === 'linux64') {
        //supports only Linux 64 bit
        require('./tasks/release_linux_64.js');
        return gulp.start('release:linux64');

    } else if (utils.os() === 'windows') {
        //using 32 bit for both win platforms
        require('./tasks/release_windows_32.js');
        return gulp.start('release:windows32');

    } else if (utils.platform() === 'osx64') {
        //supports only Mac OS 64 bit
        require('./tasks/release_osx_64.js');
        return gulp.start('release:osx64');

    } else {
        gutil.log('Release Error :', gutil.colors.red('Unsupported platform. Exit now'));
        process.exit(1);
    }
});

/**
 * Warning: Use this task with caution
 */
gulp.task('cleanAll', function () {
    del(['./dist', './tmp', './release', './build', './npm-debug.log'], {force: true}).then(function (paths) {
        gutil.log('Success :', gutil.colors.green('Cleaning completed.'));
    });
});
