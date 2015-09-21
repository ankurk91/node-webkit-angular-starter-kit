(function () {

    'use strict';
    var manifest, paths;

    //you need Wine installed on other than windows platforms

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
        releaseDir: '../release/windows/',
        tmpDir: './tmp',
        buildDir: './build/' + manifest.name + '/win32/**/*',
        targetDir: 'source',
        resources: [
            './resources/windows/*.{bmp,ico,txt,rtf}'
        ]
    };

    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}, cb)
    });

    gulp.task('release:windows.32.copyBuild', ['release:cleanTmp'], function () {
        var stream = gulp.src(paths.buildDir)
            .pipe(gulp.dest(paths.tmpDir + '/' + paths.targetDir))
            .on('error', gutil.log);
        return stream;

    });

    gulp.task('release:windows.32.copyResources', ['release:cleanTmp'], function () {
        var stream = gulp.src(paths.resources)
            .pipe(gulp.dest(paths.tmpDir))
            .on('error', gutil.log);
        return stream;
    });


    gulp.task('release:windows.32.issFile', ['release:cleanTmp'], function () {

        var issFile = jetpack.read('./resources/windows/setup-32.iss');
        issFile = utils.replace(issFile, {
            appName: manifest.name,
            appPublisher: manifest.author,
            appVersion: manifest.version,
            appUrl: manifest.homepage,
            appExeName: manifest.name + '.exe',
            setupFileName: manifest.name + '_' + manifest.version,
            outputDir: paths.releaseDir
        });
        jetpack.dir(paths.tmpDir).write('setup-32.iss', issFile);

    });


    gulp.task('release:windows.32.createInstaller', ['release:cleanTmp', 'release:windows.32.copyBuild', 'release:windows.32.copyResources', 'release:windows.32.issFile'], function () {

        var deferred = Q.defer();

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        //@source http://www.jrsoftware.org/ishelp/index.php?topic=compilercmdline
        childProcess.exec('iscc.exe /Qp ' + jetpack.dir(paths.tmpDir).path('setup-32.iss'),
            function (error, stdout, stderr) {
                if (error || stderr) {
                    gutil.log('Gulp error :', gutil.colors.red(error));
                    gutil.log('System error :', gutil.colors.red(stderr));
                } else {
                    gutil.log('Success :', gutil.colors.green('EXE is ready -' + manifest.name + '_' + manifest.version + '.exe'));
                }
                deferred.resolve();
            });

        return deferred.promise;
    });


})();
