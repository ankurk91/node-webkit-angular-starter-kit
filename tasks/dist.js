(function () {

    'use strict';

    // required packages
    var gulp = require('gulp'),
        del = require('del'),
        gutil = require("gulp-util"),
        bower = require('gulp-bower'),
        concat = require("gulp-concat"),
        ngAnnotate = require('gulp-ng-annotate'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require("gulp-uglify"),
        jshint = require("gulp-jshint"),
        jshintStylish = require('jshint-stylish'),
        ngHtml2Js = require('gulp-ng-html2js'),
        htmlreplace = require('gulp-html-replace'),
        minifyHTML = require("gulp-minify-html"),
        minifyCSS = require("gulp-minify-css"),
        image = require('gulp-image');


    // define paths
    var paths = {
        dist: {
            base: 'dist',
            js: "dist/js",
            css: "dist/css",
            img: "dist/img",
            fonts: "dist/fonts"
        },
        app: {
            base: "app",
            index: "app.html",
            scripts: [
                "app/js/app.js",
                "app/js/**/*.js"
            ],
            styles: ["app/css/**/*.css"],
            partials: ["app/partials/**/*.html"],
            images: ["app/img/**/*.{png,jpg,jpeg,gif}"],
            additional: [
                'app/package.json',
                'app/node_modules/**/*.*'
            ]
        },
        vendors: {
            scripts: [
                "bower_components/angular/angular.js",
                "bower_components/angular-ui-router/release/angular-ui-router.js",
                "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                "bower_components/underscore/underscore.js"
            ],
            styles: [
                "bower_components/bootstrap/dist/css/bootstrap.css",
                "bower_components/font-awesome/css/font-awesome.css"
            ],
            fonts: [
                "bower_components/font-awesome/fonts/*.*"
            ]


        }
    };

    gulp.task('bower', function () {
        return bower();
    });

    gulp.task('dist:clean', function (cb) {
        del(paths.dist.base, {force: true},cb)
    });


    gulp.task('dist:scripts.app', ['dist:clean'], function () {
        return gulp.src(paths.app.scripts)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.dist.js))
            .on('error', gutil.log)
    });


    gulp.task('dist:scripts.vendors', ['dist:clean', 'bower'], function () {
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
        return gulp.src(paths.app.partials)
            .pipe(minifyHTML({
                loose: true
            }))
            .pipe(ngHtml2Js({
                moduleName: 'nwApp',
                prefix: 'partials/',
                declareModule: false
            }))
            .pipe(concat('partials.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(paths.dist.js))
            .on('error', gutil.log)
    });

    gulp.task('dist:styles.theme', ['dist:clean'], function () {
        return gulp.src(paths.app.styles)
            .pipe(concat('theme.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.dist.css))
            .on('error', gutil.log)
    });


    gulp.task('dist:styles.vendors', ['dist:clean', 'bower'], function () {
        var stream = gulp.src(paths.vendors.styles)
            .pipe(concat('vendors.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.dist.css))
            .on('error', gutil.log);
        return stream;
    });


    gulp.task('dist:images', ['dist:clean'], function () {
        return gulp.src(paths.app.images)
            .pipe(image())
            .pipe(gulp.dest(paths.dist.img))
            .on('error', gutil.log)
    });

    gulp.task('dist:fonts', ['dist:clean', 'bower'], function () {
        var stream = gulp.src(paths.vendors.fonts)
            .pipe(gulp.dest(paths.dist.fonts));
        return stream;
    });

    gulp.task('dist:index', ['dist:clean'], function () {
        return gulp.src(paths.app.base + '/' + paths.app.index)
            .pipe(htmlreplace({
                css_vendors: "css/vendors.min.css",
                css_theme: "css/theme.min.css",
                js_vendors: "js/vendors.min.js",
                js_app: [
                    "js/app.min.js",
                    "js/partials.min.js"
                ]
            }))
            .pipe(minifyHTML({
                loose: true
            }))
            .pipe(gulp.dest(paths.dist.base))
            .on('error', gutil.log)
    });

    gulp.task('dist:additional', ['dist:clean'], function () {
        return gulp.src(paths.app.additional)
            .pipe(gulp.dest(paths.dist.base))
            .on('error', gutil.log)
    });


    gulp.task('dist', ['bower', 'dist:clean', 'dist:additional', 'dist:scripts.app', 'dist:scripts.vendors', 'dist:styles.theme', 'dist:styles.vendors', 'dist:partials', 'dist:images', 'dist:fonts', 'dist:index'],function(cb){
        cb(null)
    });

})();