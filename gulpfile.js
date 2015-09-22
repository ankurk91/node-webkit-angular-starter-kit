'use strict';

var gulp = require('gulp'),
    gutil = require("gulp-util"),
    del = require('del');

gulp.task('cleanAll', function () {
    del(['./dist','./tmp','./release','./npm-debug.log'], {force: true}).then(function(paths){
        gutil.log('Success :', gutil.colors.green('Cleaning completed.'));
    });
});

require('./tasks/dist.js');
require('./tasks/build.js');

require('./tasks/release_linux_64.js');
require('./tasks/release_osx_64.js');
require('./tasks/release_windows_32.js');
