'use strict';

var gulp = require('gulp'),
    gutil = require("gulp-util"),
    utils = require('./tasks/utility'),
    del = require('del');

gulp.task('cleanAll', function () {
    del(['./dist', './tmp', './release', './build', './npm-debug.log'], {force: true}).then(function (paths) {
        gutil.log('Success :', gutil.colors.green('Cleaning completed.'));
    });
});


require('./tasks/dist.js');
require('./tasks/build.js');

if (utils.os() === 'linux') {
    require('./tasks/release_linux_64.js');
} else if (utils.os() === 'windows') {
    require('./tasks/release_windows_32.js');
} else if (utils.os() === 'osx') {
    require('./tasks/release_osx_64.js');
}

