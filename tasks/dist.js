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
        htmlhint = require("gulp-htmlhint"),
        templateCache = require('gulp-angular-templatecache'),
        processhtml = require('gulp-processhtml'),
        minifyHTML = require("gulp-minify-html"),
        minifyCSS = require("gulp-minify-css"),
        header = require('gulp-header'),
        jetpack = require('fs-jetpack'),
        stripDebug = require('gulp-strip-debug'),
        eslint = require('gulp-eslint'),
        path = require('path'),
        insert = require("gulp-insert");


    // define paths
    var configs = {
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
            images: ["./app/img/**/*.{png,jpg,jpeg,gif,svg}"],
            additional: [
                './app/package.json',
                './app/node_modules/**/*'
            ]
        },
        vendors: {
            scripts: [
                "./app/node_modules/angular/angular.min.js",
                "./app/node_modules/angular-route/angular-route.min.js"
            ],
            styles: [
                "./app/node_modules/bootstrap/dist/css/bootstrap.min.css",
                "./app/node_modules/font-awesome/css/font-awesome.min.css"
            ],
            fonts: [
                "./app/node_modules/font-awesome/fonts/*.*"
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

    gulp.task('dist:clean', function () {
        del.sync(configs.dist.baseDir, {force: true})
    });

    gulp.task('dist:scripts.app', ['dist:clean'], function () {
        return gulp.src(configs.src.scripts)
            .pipe(stripDebug())
            .pipe(eslint({configFilePath: './.eslintrc'}))
            .pipe(eslint.format('stylish'))
            .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(insert.wrap('(function(window,document,undefined,angular){', '})(window,document,undefined,angular);'))
            .pipe(uglify())
            .pipe(header(banner, {pkg: pkg}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(configs.dist.js))
            .on('error', gutil.log)
    });

    gulp.task('dist:scripts.vendors', ['dist:clean'], function () {
        return gulp.src(configs.vendors.scripts)
            .pipe(concat('vendors.min.js'))
            .pipe(gulp.dest(configs.dist.js))
            .on('error', gutil.log);
    });

    gulp.task('dist:templates', ['dist:clean'], function () {

        return gulp.src(configs.src.partials)
            .pipe(htmlhint('./.htmlhintrc'))
            .pipe(htmlhint.reporter())
            .pipe(minifyHTML({
                loose: true,
                empty: true,
                cdata: true
            }))
            .pipe(templateCache({
                filename: 'templates.min.js',
                module: 'nwApp',
                root: 'views/',
                standalone: false
            }))
            .pipe(insert.wrap('(function(angular){', '})(angular);'))
            .pipe(uglify())
            .pipe(gulp.dest(configs.dist.js))
            .on('error', gutil.log)
    });

    gulp.task('dist:styles.theme', ['dist:clean'], function () {
        return gulp.src(configs.src.styles)
            .pipe(concat('theme.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(configs.dist.css))
            .on('error', gutil.log)
    });


    gulp.task('dist:styles.vendors', ['dist:clean'], function () {
        return gulp.src(configs.vendors.styles)
            .pipe(concat('vendors.min.css'))
            .pipe(gulp.dest(configs.dist.css))
            .on('error', gutil.log);

    });

    gulp.task('dist:indexFile', ['dist:clean', 'dist:styles.vendors', 'dist:styles.theme', 'dist:templates', 'dist:scripts.vendors', 'dist:scripts.app'], function () {

        return gulp.src(configs.src.baseDir + '/index.html')
            .pipe(htmlhint('./.htmlhintrc'))
            .pipe(htmlhint.reporter())
            .pipe(processhtml())
            .pipe(minifyHTML({
                loose: true,
                empty: true,
                cdata: true
            }))
            .pipe(gulp.dest(configs.dist.baseDir))
            .on('error', gutil.log)
    });

    gulp.task('dist:copyImages', ['dist:clean'], function () {
        var stream = gulp.src(configs.src.images)
            .pipe(gulp.dest(configs.dist.img))
            .on('error', gutil.log);
        return stream;
    });

    gulp.task('dist:copyFonts', ['dist:clean'], function () {
        var stream = gulp.src(configs.vendors.fonts)
            .pipe(gulp.dest(configs.dist.fonts))
            .on('error', gutil.log);
        return stream;

    });

    gulp.task('dist:additional', ['dist:clean'], function () {
        var stream = gulp.src(configs.src.additional)
            .pipe(gulp.dest(configs.dist.baseDir))
            .on('error', gutil.log);
        return stream;
    });


    gulp.task('dist', [
            'dist:clean',
            'dist:scripts.app',
            'dist:scripts.vendors',
            'dist:styles.theme',
            'dist:styles.vendors',
            'dist:templates',
            'dist:indexFile',
            'dist:additional',
            'dist:copyImages',
            'dist:copyFonts'],
        function (cb) {
            cb(null)
        });

})();
