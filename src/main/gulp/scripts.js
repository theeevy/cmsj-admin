'use strict';

const
    gulp = require('gulp'),
    size = require('gulp-size'),
    eslint = require('gulp-eslint'),
    path = require('path');

const
    config = require('./config');

gulp.task('scripts', function(){
   return gulp.src(path.join(config.paths.app, '**/*.js'))
       .pipe(eslint())
       .pipe(eslint.format())
       .pipe(size());
});