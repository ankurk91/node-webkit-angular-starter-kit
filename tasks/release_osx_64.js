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
        releaseDir: jetpack.dir('./release/osx/'),
        buildDir: './build/' + manifest.name + '/osx64/**/*',
        tmpDir: './tmp',
        buildTargetDir: jetpack.dir('./tmp').cwd(manifest.name + '.app')
    };

    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}, cb)
    });

    gulp.task('release:osx.64.copyBuild', ['release:cleanTmp'], function () {
        var stream = gulp.src(paths.buildDir)
            .pipe(gulp.dest(paths.buildTargetDir.path()))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('release:osx.64.plistFile', ['release:cleanTmp'], function () {
        var plist = jetpack.read('./resources/osx/Info.plist');

        //todo add more dynamic options to plist file
        plist = utils.replace(plist, {
            productName: manifest.name,
            version: manifest.version
        });
        jetpack.dir(paths.tmpDir).write('Contents/Info.plist', plist);
    });

    gulp.task('release:osx.64.jsonFile', ['release:cleanTmp'], function () {

        var dmgManifest = jetpack.read('./resources/osx/appdmg.json');

        //appdmg.json needs full path
        dmgManifest = utils.replace(dmgManifest, {
            productName: manifest.name,
            appPath: paths.buildTargetDir.path(),
            dmgIcon: jetpack.path("./resources/osx/dmg-icon.icns"),
            dmgBackground: jetpack.path("./resources/osx/dmg-background.png")
        });
        paths.buildTargetDir.write('appdmg.json', dmgManifest);
    });

    gulp.task('release:osx.64.createInstaller', ['release:cleanTmp', 'release:osx.64.jsonFile', 'release:osx.64.plistFile', 'release:osx.64.copyBuild'], function () {
        var deferred = Q.defer();
        var appdmg = require('appdmg');

        var dmgName = manifest.name + '_' + manifest.version + '.dmg';

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        //appdmg needs full path
        appdmg({
            source: paths.buildTargetDir.path('appdmg.json'),
            target: paths.releaseDir.path(dmgName)
        })
            .on('error', function (error) {
                gutil.log('Error :', gutil.colors.red(error));
            })
            .on('finish', function () {
                gutil.log('Success :', gutil.colors.green('DMG is ready -' + dmgName));
                deferred.resolve();
            });

        return deferred.promise;
    });

    gulp.task('release:osx64', ['release:cleanTmp', 'release:osx.64.copyBuild', 'release:osx.64.jsonFile', 'release:osx.64.plistFile', 'release:osx.64.createInstaller'], function (cb) {
        cb(null)
    })

})();
