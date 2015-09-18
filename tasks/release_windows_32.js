(function () {

    'use strict';
    var manifest, paths;

    //you need Wine installed on other than windows platforms

    var gulp = require('gulp'),
        del = require('del'),
        gutil = require("gulp-util");

    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}, cb)
    });

    gulp.task('release:windows.createInstaller', function () {

    })

})();
