(function () {

    //only works on OS X because of appdmg
    'use strict';

    var manifest, paths;

    var gulp = require('gulp'),
        del = require('del'),
        utils = require('./utility'),
        gutil = require("gulp-util"),
        jetpack = require('fs-jetpack'),
        Q = require('q');

    //read original package.json
    manifest = jetpack.read('./package.json', 'json');

    paths = {
        releaseDir: './release/osx/',
        buildDir: './build/' + manifest.name + '/osx64/**/*',
        tmpDir: './tmp',
        targetDir: jetpack.dir('./tmp').cwd(manifest.name + '.app').path()
    };

    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}, cb)
    });

    gulp.task('release:osx.copyBuild', ['release:cleanTmp'], function () {
        var stream = gulp.src(paths.buildDir)
            .pipe(gulp.dest(paths.targetDir))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('release:osx.plistFile', ['release:cleanTmp'], function () {
        var plist = jetpack.read('./resources/osx/Info.plist');

        plist = utils.replace(plist, {
            productName: manifest.name,
            version: manifest.version
        });
        jetpack.dir(paths.tmpDir).write('Contents/Info.plist', plist);
    });

    gulp.task('release:osx.jsonFile', ['release:cleanTmp'], function () {

        var dmgManifest = jetpack.read('./resources/osx/appdmg.json');

        dmgManifest = utils.replace(dmgManifest, {
            productName: manifest.name,
            appPath: paths.targetDir,
            dmgIcon: jetpack.path("./resources/osx/dmg-icon.icns"),
            dmgBackground: jetpack.path("./resources/osx/dmg-background.png")
        });
        jetpack.dir(paths.tmpDir).cwd(manifest.name + '.app').write('appdmg.json', dmgManifest);
    });

    gulp.task('release:osx.createInstaller', ['release:cleanTmp', 'release:osx.jsonFile', 'release:osx.plistFile', 'release:osx.copyBuild'], function () {
        var deferred = Q.defer();
        var appdmg = require('appdmg');

        var dmgName = manifest.name + '_' + manifest.version + '.dmg';

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        appdmg({
            source: jetpack.dir(paths.tmpDir).path('appdmg.json'),
            target: jetpack.dir(paths.releaseDir).path(dmgName)
        })
            .on('error', function (error) {
                gutil.log('Error :', gutil.colors.red(error));
            })
            .on('finish', function () {
                gutil.log('Success :', gutil.colors.green('DMG is ready'));
                deferred.resolve();
            });

        return deferred.promise;
    });

    gulp.task('release:osx', ['release:cleanTmp', 'release:osx.copyBuild', 'release:osx.jsonFile', 'release:osx.plistFile', 'release:osx.createInstaller'], function (cb) {
        cb(null)
    })

})();
