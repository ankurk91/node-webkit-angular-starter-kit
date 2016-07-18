(function () {

    //only works on OS X because of appdmg

    //@link https://github.com/LinusU/node-appdmg

    'use strict';

    var manifest, paths;

    var gulp = require('gulp'),
        del = require('del'),
        utils = require('./utility'),
        gutil = require("gulp-util"),
        jetpack = require('fs-jetpack');


    //read original package.json
    manifest = jetpack.read('./package.json', 'json');

    paths = {
        releaseDir: jetpack.dir('./release/osx/'),
        buildDir: './build/' + manifest.name + '/osx64/**/*',
        tmpDir: './tmp',
        buildTargetDir: jetpack.dir('./tmp').cwd(manifest.name + '.app')
    };

    gulp.task('release:cleanTmp', function (cb) {
        del(paths.tmpDir, {force: true}).then(function () {
                //will create tmp folder again after deleting it
                jetpack.cwd(paths.tmpDir);
                cb(null)
            }
        )
    });

    gulp.task('release:osx.64.copyBuild', ['release:cleanTmp'], function () {
        var stream = gulp.src(paths.buildDir)
            .pipe(gulp.dest(paths.tmpDir))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('release:osx.64.jsonFile', ['release:cleanTmp'], function () {

        var dmgManifest = jetpack.read('./resources/osx/appdmg.json');

        //appdmg.json needs full path
        dmgManifest = utils.replace(dmgManifest, {
            productName: manifest.productName || manifest.name,
            appPath: paths.buildTargetDir.path(),
            dmgIcon: jetpack.path("./resources/osx/dmg-icon.icns"),
            dmgBackground: jetpack.path("./resources/osx/dmg-background.png")
        });
        jetpack.dir(paths.tmpDir).write('appdmg.json', dmgManifest);
    });

    gulp.task('release:osx.64.createInstaller', ['release:cleanTmp', 'release:osx.64.jsonFile', 'release:osx.64.copyBuild'], function () {

        //lets not require it globally
        var appdmg = require('appdmg');

        var dmgName = manifest.name + '_' + manifest.version + '.dmg';

        gutil.log('Info :', gutil.colors.blue('Deleting dmg if already exists.'));
        //remove dmg if already exists
        jetpack.remove(paths.releaseDir.path(dmgName));

        gutil.log('Info :', gutil.colors.blue('Please wait while creating installer...'));

        return new Promise(function (resolve, reject) {
            //app-dmg needs full path
            var process = appdmg({
                source: jetpack.dir(paths.tmpDir).path('appdmg.json'),
                target: paths.releaseDir.path(dmgName)
            });
            process.on('progress', function (step) {
                gutil.log('AppDMG Progress:', gutil.colors.blue(step.type + ' : ' + step.title));
            });
            process.on('error', function (error) {
                gutil.log('AppDMG Error :', gutil.colors.red(error));
                reject(error);
            });
            process.on('finish', function () {
                gutil.log('AppDMG Success :', gutil.colors.green('DMG is ready - ' + dmgName));
                resolve();
            });

        });

    });

    gulp.task('release:osx64', ['release:cleanTmp', 'release:osx.64.copyBuild', 'release:osx.64.jsonFile', 'release:osx.64.createInstaller'], function (cb) {
        cb(null)
    })

})();
