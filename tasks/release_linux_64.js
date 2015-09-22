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
        childProcess = require('child_process'),
        Q = require('q');

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


    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}).then(cb(null))
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
            arch: 'amd64'
        });
        jetpack.dir(paths.tmpDir).write('DEBIAN/control', control);
    });

    gulp.task('release:linux.64.createInstaller', ['release:cleanTmp', 'release:linux.64.copyBuild', 'release:linux.64.additional', 'release:linux.64.desktopFile', 'release:linux.64.controlFile'], function () {

        var deferred = Q.defer();

        var packName = manifest.name + '_' + manifest.version + '_amd64.deb';

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        childProcess.exec('fakeroot dpkg-deb -Zxz --build ' + jetpack.dir(paths.tmpDir).path() + ' ' + jetpack.dir(paths.releaseDir).path(),
            function (error, stdout, stderr) {
                if (error || stderr) {
                    gutil.log('Gulp error :', gutil.colors.red(error));
                    gutil.log('System error :', gutil.colors.red(stderr));
                } else {
                    gutil.log('Success :', gutil.colors.green('DEB is ready - ' + packName));
                }
                deferred.resolve();
            });

        return deferred.promise;
    });

    gulp.task('release:linux64', ['release:cleanTmp', 'release:linux.64.copyBuild', 'release:linux.64.additional', 'release:linux.64.controlFile', 'release:linux.64.desktopFile', 'release:linux.64.createInstaller'], function (cb) {
        cb(null)
    })

})();
