var SRC      = 'project';
var BUILD    = '.tmp';
var DIST     = 'dist';
var STATIC   = 'static';

module.exports = {

    dirs: {
        'temp'   : BUILD,
        'static' : STATIC,
        'product': DIST
    },

    globs: {
        'views'  : SRC    + '/*.html',
        'assets' : STATIC + '/**',
        'styles' : SRC    + '/less/*.less',
        'scripts': SRC    + '/scripts/**/*.js'
    }

};
