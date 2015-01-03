var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');


module.exports = function (gulp, $, config) {

    gulp.task('html', function () {
        return gulp.src(paths['develop'] + '/index.html')
            .pipe(gulp.dest(paths['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('styles', function () {
        return gulp.src(paths['less'])
            .pipe(handleErrors())
            .pipe($.less())
            .pipe($.concat('style.css'))
            .pipe(gulp.dest(paths['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('scripts', [ 'lint' ], function () {
        return gulp.src(paths['scripts'])
            .pipe(handleErrors())
            .pipe($.sourcemaps.init())
            .pipe($.traceur({
                modules: 'register',
                moduleName: true
            }))
            .pipe($.concat('game.js'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(paths['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('lint', function () {
        return gulp.src([ paths['scripts'] ])
            .pipe(handleErrors())
            .pipe($.jshint('.jshintrc'))
            .pipe($.jshint.reporter('jshint-stylish'));
    });

    gulp.task('compile', [
        'html',
        'styles',
        'scripts'
    ]);

    gulp.task('server', [ 'compile' ], function () {
        browserSync({
            server: {
                baseDir: [
                    paths['static'],
                    paths['temp']
                ]
            }
        });
    });

    gulp.task('watch', function () {
        gulp.watch(paths['scripts'],                 [ 'scripts' ]);
        gulp.watch(paths['less'],                    [  'styles' ]);
        gulp.watch(paths['develop'] + '/index.html', [    'html' ]);
    });

    // The default task, run with `gulp default` or `gulp`.
    gulp.task('dev', [
        'watch',
        'server'
    ]);

    // The default task, run with `gulp default` or `gulp`.
    gulp.task('default', [ 'dev' ]);

};
