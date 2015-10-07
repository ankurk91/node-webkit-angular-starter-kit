(function () {

    'use strict';

    // required packages
    var gulp = require('gulp'),
        del = require('del'),
        gutil = require("gulp-util"),
        concat = require("gulp-concat"),
        ngAnnotate = require('gulp-ng-annotate'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require("gulp-uglify"),
        jshint = require("gulp-jshint"),
        csslint = require('gulp-csslint'),
        jshintStylish = require('jshint-stylish'),
        htmlhint = require("gulp-htmlhint"),
        ngHtml2Js = require('gulp-ng-html2js'),
        processhtml = require('gulp-processhtml'),
        minifyHTML = require("gulp-minify-html"),
        minifyCSS = require("gulp-minify-css"),
        imagemin = require('gulp-imagemin'),
        header = require('gulp-header'),
        jetpack = require('fs-jetpack'),
        stripDebug = require('gulp-strip-debug'),
        eslint = require('gulp-eslint');


    // define paths
    var paths = {
        dist: {
            baseDir: './dist',
            js: "./dist/js",
            css: "./dist/css",
            img: "./dist/img",
            fonts: "./dist/fonts"
        },
        src: {
            baseDir: "./app",
            scripts: [
                "./app/app.js",
                "./app/app.config.js",
                "./app/app-ctrl.js",
                "./app/views/**/*.js"
            ],
            styles: ["./app/css/**/*.css"],
            partials: ["./app/views/**/*.html"],
            images: ["./app/img/**/*.{png,jpg,jpeg,gif}"],
            additional: [
                './app/package.json',
                './app/node_modules/**/*'
            ]
        },
        vendors: {
            scripts: [
                "./app/bower_components/angular/angular.js",
                "./app/bower_components/angular-ui-router/release/angular-ui-router.js",
                "./app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                "./app/bower_components/underscore/underscore.js"
            ],
            styles: [
                "./app/bower_components/bootstrap/dist/css/bootstrap.css",
                "./app/bower_components/font-awesome/css/font-awesome.css"
            ],
            fonts: [
                "./app/bower_components/font-awesome/fonts/*.*"
            ]

        }
    };

    var pkg = require('../package.json');
    var banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

    gulp.task('dist:clean', function (cb) {
        del(paths.dist.baseDir, {force: true}).then(cb(null))
    });


    gulp.task('dist:scripts.app', ['dist:clean'], function () {
        return gulp.src(paths.src.scripts)
            .pipe(stripDebug())
            .pipe(jshint('./.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(eslint({configFilePath:'./.eslintrc'}))
            .pipe(eslint.format('stylish'))
            .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(header(banner, {pkg: pkg}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.dist.js))
            .on('error', gutil.log)
    });


    gulp.task('dist:scripts.vendors', ['dist:clean'], function () {
        var stream = gulp.src(paths.vendors.scripts)
            .pipe(sourcemaps.init())
            .pipe(concat('vendors.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.dist.js))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('dist:partials', ['dist:clean'], function () {

        var config = jetpack.read('./.htmlhintrc', 'json');
        //partials files does not have a doctype
        config["doctype-first"] = false;

        return gulp.src(paths.src.partials)
            .pipe(htmlhint(config))
            .pipe(htmlhint.reporter())
            .pipe(minifyHTML({
                loose: true
            }))
            .pipe(ngHtml2Js({
                moduleName: 'nwApp',
                prefix: 'views/',
                declareModule: false
            }))
            .pipe(concat('partials.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(paths.dist.js))
            .on('error', gutil.log)
    });

    gulp.task('dist:styles.theme', ['dist:clean'], function () {
        return gulp.src(paths.src.styles)
            .pipe(csslint('./.csslintrc'))
            .pipe(csslint.reporter())
            .pipe(concat('theme.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.dist.css))
            .on('error', gutil.log)
    });


    gulp.task('dist:styles.vendors', ['dist:clean'], function () {
        var stream = gulp.src(paths.vendors.styles)
            .pipe(concat('vendors.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.dist.css))
            .on('error', gutil.log);
        return stream;

    });


    gulp.task('dist:images', ['dist:clean'], function () {
        return gulp.src(paths.src.images)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
            }))
            .pipe(gulp.dest(paths.dist.img))
            .on('error', gutil.log)
    });

    gulp.task('dist:copyFonts', ['dist:clean'], function () {
        var stream = gulp.src(paths.vendors.fonts)
            .pipe(gulp.dest(paths.dist.fonts))
            .on('error', gutil.log);
        return stream;

    });

    gulp.task('dist:indexFile', ['dist:clean'], function () {
        return gulp.src(paths.src.baseDir + '/index.html')
            .pipe(htmlhint('./.htmlhintrc'))
            .pipe(htmlhint.reporter())
            .pipe(processhtml())
            .pipe(minifyHTML({
                loose: true
            }))
            .pipe(gulp.dest(paths.dist.baseDir))
            .on('error', gutil.log)
    });

    gulp.task('dist:additional', ['dist:clean'], function () {
        var stream = gulp.src(paths.src.additional)
            .pipe(gulp.dest(paths.dist.baseDir))
            .on('error', gutil.log);
        return stream;
    });


    gulp.task('dist', ['dist:clean', 'dist:additional', 'dist:scripts.app', 'dist:scripts.vendors', 'dist:styles.theme', 'dist:styles.vendors', 'dist:partials', 'dist:images', 'dist:copyFonts', 'dist:indexFile'], function (cb) {
        cb(null)
    });

})();
