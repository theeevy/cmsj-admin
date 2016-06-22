'use strict';

const
    gulp = require('gulp'),
    proxy = require('proxy-middleware'),
    browserSync = require('browser-sync'),
    browserSyncSpa = require('browser-sync-spa');


const
    config = require('./config');

browserSync.use(browserSyncSpa({
    // Only needed for angular apps
    selector: "[ng-app]"
}));

gulp.task('serve', function(){
    var proxyOptions = require('url').parse('http://localhost:8080/entity');
    proxyOptions.route = '/entity';

    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: [config.paths.tmp + '/serve', config.paths.app, config.paths.img],
            routes: {
                '/bower_components': 'bower_components'
            },
            middleware: [proxy(proxyOptions)]
        }
    });
});
