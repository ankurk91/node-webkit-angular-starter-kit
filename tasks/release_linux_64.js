(function () {

    //works only on ubuntu linux because of dpkg-deb
    'use strict';

    var manifest, paths;

    //include gulp itself
    var gulp = require('gulp'),
        del = require('del'),
        gutil = require("gulp-util"),
        utils = require('./utility'),
        jetpack = require('fs-jetpack'),
        childProcess = require('child_process');


    //read original package.json
    manifest = jetpack.read('./package.json', 'json');

    paths = {
        releaseDir: './release/linux/',
        tmpDir: './tmp',
        buildDir: './build/' + manifest.name + '/linux64/**/*',
        targetDir: 'opt/' + manifest.name,
        additional: [
            './dist/img/icon.png'
        ]
    };


    gulp.task('release:cleanTmp', function () {
        del.sync(paths.tmpDir, {force: true})
    });

    gulp.task('release:linux.64.copyBuild', ['release:cleanTmp'], function (cb) {
        var stream = gulp.src(paths.buildDir)
            .pipe(gulp.dest(paths.tmpDir + '/' + paths.targetDir))
            .on('error', gutil.log);
        return stream;

    });

    gulp.task('release:linux.64.additional', ['release:cleanTmp', 'release:linux.64.copyBuild'], function (cb) {
        var stream = gulp.src(paths.additional)
            .pipe(gulp.dest(paths.tmpDir + '/' + paths.targetDir))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('release:linux.64.desktopFile', ['release:cleanTmp'], function () {

        var desktop = jetpack.read('./resources/linux/app.desktop');
        desktop = utils.replace(desktop, {
            name: manifest.name,
            productName: manifest.productName || manifest.name,
            description: manifest.description,
            version: manifest.version,
            author: manifest.author
        });
        jetpack.dir(paths.tmpDir).write('usr/share/applications/' + manifest.name + '.desktop', desktop);

    });

    gulp.task('release:linux.64.controlFile', ['release:cleanTmp', 'release:linux.64.copyBuild', 'release:linux.64.additional'], function () {

        var readyAppdir = jetpack.dir(paths.tmpDir).cwd('opt', manifest.name);
        // Counting size of the app in KiB
        var appSize = Math.round(readyAppdir.inspectTree('.').size / 1024);

        var control = jetpack.read('./resources/linux/DEBIAN/control');
        control = utils.replace(control, {
            name: manifest.name,
            description: manifest.description,
            version: manifest.version,
            author: manifest.author,
            size: appSize,
            homepage: manifest.homepage,
            arch: 'amd64' //i386
        });
        jetpack.dir(paths.tmpDir).write('DEBIAN/control', control);
    });

    gulp.task('release:linux.64.createInstaller', ['release:cleanTmp', 'release:linux.64.copyBuild', 'release:linux.64.additional', 'release:linux.64.desktopFile', 'release:linux.64.controlFile'], function () {

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        return new Promise(function (resolve, reject) {
            var process = childProcess.exec('fakeroot dpkg-deb -Zxz --build ' + jetpack.dir(paths.tmpDir).path() + ' ' + jetpack.dir(paths.releaseDir).path());

            process.stdout.on('data', function (data) {
                gutil.log('Process -', data);
            });

            process.stderr.on('data', function (data) {
                gutil.log('System error :', gutil.colors.red(data));
            });

            process.on('error', function (error) {
                gutil.log('Gulp error :', gutil.colors.red(error));
                reject(err);
            });

            process.on('close', function (exitCode) {
                if (exitCode == 0) {
                    gutil.log('Success :', gutil.colors.green('Installer created.'));
                }
                resolve();
            });
        });

    });

    gulp.task('release:linux64', ['release:cleanTmp', 'release:linux.64.copyBuild', 'release:linux.64.additional', 'release:linux.64.controlFile', 'release:linux.64.desktopFile', 'release:linux.64.createInstaller'], function (cb) {
        cb(null)
    })

})();
