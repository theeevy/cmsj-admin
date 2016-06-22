'use strict';

const
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    angularFilesort = require ('gulp-angular-filesort'),
    bowerFiles = require('main-bower-files'),
    path = require('path');

const
    config = require('./config');

gulp.task('inject', ['scripts'], function(){
    var target = gulp.src(path.join(config.paths.app, 'index.html'));

    var srcScripts = gulp.src(path.join(config.paths.app, '**/*.js'))
        .pipe(angularFilesort())
        .on('error', config.errorHandler('AngularFilesort'));
    var srcStyles = gulp.src(path.join(config.paths.app, '**/*.css'), { read : false });

    var injectOptions = {
        ignorePath: [path.normalize(config.paths.app), path.normalize(config.paths.tmp)], // tmp нужен в случае предобработки COFFEE/ES6/TYPE или LESS/SASS
        addRootSlash: false
    };

    return target
        .pipe(inject(srcScripts, injectOptions))
        .pipe(inject(srcStyles, injectOptions))
        .pipe(inject(gulp.src(bowerFiles(), { read : false}), { name : 'inject_bower'}))
        .pipe(gulp.dest(config.paths.tmp + '/serve'));
});