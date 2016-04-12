'use strict';

const
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync'),
    path = require('path');

const
    paths = {
        app : './src/main/html5/',
        tmp : './target/.tmp/',
        dist: './src/main/webapp/'
    };


gulp.task('serve', function(){
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: [paths.tmp, paths.app],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
})

gulp.task('inject', function(){
    var target = gulp.src(path.join(paths.app, 'index.html'));
    var sources = gulp.src('**/*.{js,css}', { read : false, cwd : path.join(__dirname, paths.app)});

    return target
        .pipe(inject(gulp.src(bowerFiles(), { read : false}), { name : 'inject_bower'}))
        .pipe(inject(sources))
        .pipe(gulp.dest(paths.app));
})