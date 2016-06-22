'use strict';

//4commit
const
    gulp = require('gulp'),
    fs = require('fs');

const
    builderModules = './src/main/gulp/';

fs.readdirSync(builderModules)
    .filter(function(file){
        return /\.(js|coffee)$/.test(file);
    })
    .map(function(file){
        require(builderModules + file)
    });


gulp.task('default', ['clean'], function(callback){
    gulp.start('build');
    return callback();
});