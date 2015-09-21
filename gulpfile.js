'use strict';

var gulp = require('gulp'),
    del = require('del');

gulp.task('cleanAll', function (cb) {
    del(['./dist','./tmp','./release','./npm-debug.log'], {force: true}, cb)
});

require('./tasks/dist.js');
require('./tasks/build.js');

require('./tasks/release_linux_64.js');
require('./tasks/release_osx_64.js');
require('./tasks/release_windows_32.js');
