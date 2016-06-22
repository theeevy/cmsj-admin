'use strict';

const
    gutil = require('gulp-util');

exports.moduleName = 'cmsj-admin';

exports.paths = {
    app : './src/main/html5/',
    tmp : './target/.tmp/',
    dist: './src/main/webapp/',
    img : '/mnt/st/development/mototeamrussia/bS/'
};

exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
