module.exports = function (gulp, $, config, deps) {

    var del          = deps['del'];
    var runSequence  = deps['runSequence'];
    var handleErrors = deps['handleErrors'];

    var dirs    = config.dirs;
    var globs   = config.globs;
    var options = config.pluginOptions;

    gulp.task('dist:clean', function (done) {
        del([ dirs['temp'], dirs['product'] ], done);
    });

    gulp.task('dist:views', function () {
        return gulp.src(globs['views'])
            .pipe(handleErrors())
            .pipe($.processhtml())
            .pipe(gulp.dest(dirs['product']));
    });

    gulp.task('dist:styles', function () {
        return gulp.src(globs['styles'])
            .pipe(handleErrors())
            .pipe($.less())
            .pipe($.minifyCss({
                keepSpecialComments: false,
                removeEmpty: true
            }))
            .pipe($.rename('style.min.css'))
            .pipe(gulp.dest(dirs['product']));
    });

    gulp.task('dist:scripts', [ 'dev:build:bundle', 'dev:build:scripts' ], function () {
        return gulp.src([
                './.tmp/bundle.js',
                './.tmp/game.js'
            ])
            .pipe($.sourcemaps.init())
            .pipe($.concat('game.min.js'))
            .pipe($.uglify())
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(dirs['product']));
    });

    gulp.task('dist:assets', function () {
        gulp.src([
            'static/**',
            '!static/bower_components',     // Workaround to ensure both directory
            '!static/bower_components/**'   // and its contents don't get copied.
        ])
            .pipe(handleErrors())
            .pipe(gulp.dest(dirs['product']));
    });

    gulp.task('dist:appcache', function () {
        return gulp.src(globs['assets'])
            .pipe(handleErrors())
            .pipe($.manifest(options['dist:appcache']))
            .pipe(gulp.dest(dirs['product']));
    });

    gulp.task('dist', function (done) {
        runSequence('dist:clean', [
            'dist:views',
            'dist:assets',
            'dist:styles',
            'dist:scripts',
            'dist:appcache'
        ], done);
    });

};
