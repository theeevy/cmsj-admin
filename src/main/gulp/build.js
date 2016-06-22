'use strict';

const
    gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    minifyHtml = require('gulp-minify-html'),
    size = require('gulp-size'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    mainBowerFiles = require('main-bower-files'),
    del = require('del'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    path = require('path');

const
    config = require('./config');

gulp.task('partials', function(){
    return gulp.src([path.join(config.paths.app, '**/*.html'), '!' + path.join(config.paths.app, 'index.html')])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(angularTemplateCache({
            module: config.moduleName
        }))
        .pipe(gulp.dest(path.join(config.paths.tmp, '/partials')));
});

gulp.task('html', ['inject', 'partials'], function(){
    var injectPartialsFile = gulp.src(path.join(config.paths.tmp, '/partials/templates.js'), { read: false });
    var injectPartialsOptions = {
        name: 'inject_partials',
        ignorePath: path.join(config.paths.tmp, '/partials'),
        addRootSlash: false
    };

    return gulp.src(path.join(config.paths.tmp, '/serve/*.html'))
        .pipe(inject(injectPartialsFile,injectPartialsOptions))
        .pipe(useref())
        .pipe(debug())


        .pipe(gulp.dest(path.join(config.paths.dist, '/')))
        .pipe(size())
});

gulp.task('fonts', function(){
    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest(path.join(config.paths.dist, '/fonts/')));
});

gulp.task('other', function(){

});

gulp.task('clean', function(){
    return del([
        path.join(config.paths.tmp, '/'),
        path.join(config.paths.dist, '/**'),
        '!' + path.join(config.paths.dist, '.')
    ])
});

gulp.task('build', ['html','fonts','other']);