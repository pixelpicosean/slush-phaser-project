module.exports = function (gulp, $, config, deps) {

    var browserSync    = deps['browserSync'];
    var handleErrors   = deps['handleErrors'];
    var mainBowerFiles = deps['mainBowerFiles'];

    var dirs  = config.dirs;
    var globs = config.globs;

    // Forget any cached data
    // Reference: https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md
    function forget (cacheName) {
        return function (e) {
            if (e.type === 'deleted') {
                $.remember.forget(cacheName, e.path);
                delete $.cached.caches[cacheName][e.path];
            }
        };
    }

    gulp.task('dev:build:views', function () {
        return gulp.src(globs['views'])
            .pipe(gulp.dest(dirs['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('dev:build:styles', function () {
        return gulp.src(globs['styles'])
            .pipe(handleErrors())
            .pipe($.less())
            .pipe($.concat('style.css'))
            .pipe(gulp.dest(dirs['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('dev:build:scripts', [ 'dev:lint' ], function () {
        return gulp.src(globs['scripts'])
            .pipe(handleErrors())
            .pipe($.cached('scripts'))
            .pipe($.sourcemaps.init())
            .pipe($.traceur({
                modules: 'register',
                moduleName: true
            }))
            .pipe($.remember('scripts'))
            .pipe($.concat('game.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(dirs['temp']))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('dev:build:bundle', function () {
        return gulp.src(mainBowerFiles())
            .pipe($.concat('bundle.js'))
            .pipe(gulp.dest(dirs['temp']));
    });

    gulp.task('dev:server', [ 'dev:build' ], function () {
        browserSync({
            server: {
                baseDir: [
                    dirs['static'],
                    dirs['temp']
                ]
            },
            ghostMode: false,
            notify: false
        });
    });

    gulp.task('dev:watch', function () {
        gulp.watch(globs['scripts'], [ 'dev:build:scripts' ])
            .on('changed', forget('scripts'));

        gulp.watch(globs['styles'],  [  'dev:build:styles' ]);
        gulp.watch(globs['views'],   [   'dev:build:views' ]);
    });

    gulp.task('dev:lint', function () {
        return gulp.src([ globs['scripts'] ])
            .pipe(handleErrors())
            .pipe($.jshint('.jshintrc'))
            .pipe($.jshint.reporter('jshint-stylish'));
    });

    gulp.task('dev:build', [
        'dev:build:views',
        'dev:build:bundle',
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
