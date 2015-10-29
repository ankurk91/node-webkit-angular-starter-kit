'use strict';

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
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var bump = require('gulp-bump');
    var args = require('yargs').argv;

    var options = {},
        type = args.type,
        version = args.ver;

    if (version) {
        options.version = version;
    } else {
        options.type = type;
    }

    var files = [
        {src: './app/package.json', dest: './app'},
        {src: './package.json', dest: './'}
    ];

    files.forEach(function (file) {
        gulp.src(file.src)
            .pipe(bump(options))
            .pipe(gulp.dest(file.dest));
    });


});


/**
 * Warning: Use this task with caution
 */
gulp.task('cleanAll', function () {
    del(['./dist', './tmp', './release', './build', './npm-debug.log'], {force: true}).then(function (paths) {
        gutil.log('Success :', gutil.colors.green('Cleaning completed.'));
    });
});
