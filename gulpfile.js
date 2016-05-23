'use strict';

const
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    proxy = require('proxy-middleware'),
    browserSync = require('browser-sync'),
    path = require('path');

const
    paths = {
        app : './src/main/html5/',
        tmp : './target/.tmp/',
        dist: './src/main/webapp/',
        img : '/mnt/st/development/mototeamrussia/bS/'
    };


gulp.task('serve', function(){
    var proxyOptions = require('url').parse('http://localhost:8080/entity');
    proxyOptions.route = '/entity';

    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: [paths.tmp, paths.app, paths.img],
            routes: {
                '/bower_components': 'bower_components'
            },
            middleware: [proxy(proxyOptions)]
        }
    });
});

gulp.task('inject', function(){
    var target = gulp.src(path.join(paths.app, 'index.html'));
    var sources = gulp.src('**/*.{js,css}', { read : false, cwd : path.join(__dirname, paths.app)});

    return target
        .pipe(inject(gulp.src(bowerFiles(), { read : false}), { name : 'inject_bower'}))
        .pipe(inject(sources))
        .pipe(gulp.dest(paths.app));
});