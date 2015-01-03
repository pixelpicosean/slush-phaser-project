var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');


module.exports = function (gulp, $, config) {

    var paths = config.paths;

    gulp.task('dev:build:views', function () {
        return gulp.src(paths['develop'] + '/index.html')
            .pipe(gulp.dest(paths['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('dev:build:styles', function () {
        return gulp.src(paths['less'])
            .pipe(handleErrors())
            .pipe($.less())
            .pipe($.concat('style.css'))
            .pipe(gulp.dest(paths['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('dev:build:scripts', [ 'dev:lint' ], function () {
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

    gulp.task('dev:server', [ 'dev:build' ], function () {
        browserSync({
            server: {
                baseDir: [
                    paths['static'],
                    paths['temp']
                ]
            }
        });
    });

    gulp.task('dev:watch', function () {
        gulp.watch(paths['scripts'],                 [ 'dev:build:scripts' ]);
        gulp.watch(paths['less'],                    [  'dev:build:styles' ]);
        gulp.watch(paths['develop'] + '/index.html', [   'dev:build:views' ]);
    });

    gulp.task('dev:lint', function () {
        return gulp.src([ paths['scripts'] ])
            .pipe(handleErrors())
            .pipe($.jshint('.jshintrc'))
            .pipe($.jshint.reporter('jshint-stylish'));
    });

    gulp.task('dev:build', [
        'dev:build:views',
        'dev:build:styles',
        'dev:build:scripts'
    ]);

    gulp.task('dev', [
        'dev:watch',
        'dev:server'
    ]);

    // Aliasing `dev` as default task.
    gulp.task('default', [ 'dev' ]);

};
