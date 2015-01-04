module.exports = function (gulp, $, config, deps) {

    var del          = deps['del'];
    var runSequence  = deps['runSequence'];
    var handleErrors = deps['handleErrors'];

    var dirs    = config.dirs;
    var globs   = config.globs;
    var options = config.pluginOptions;

    gulp.task('dist:clean', function (done) {
        del([ dirs['build'], dirs['dist'] ], done);
    });

    gulp.task('dist:views', function () {
        return gulp.src(globs['views'])
            .pipe(handleErrors())
            .pipe($.processhtml())
            .pipe(gulp.dest(dirs['dist']));
    });

    gulp.task('dist:styles', [ 'dev:build:styles' ], function () {
        return gulp.src(dirs['build'] + '/*.css')
            .pipe(handleErrors())
            .pipe($.minifyCss(options['dist:styles']))
            .pipe($.rename({ extname: '.min.css' }))
            .pipe(gulp.dest(dirs['dist']));
    });

    gulp.task('dist:scripts', [ 'dev:build:bundle', 'dev:build:scripts' ], function () {
        return gulp.src([dirs['build'] + '/bundle.js', dirs['build'] + '/game.js'])
            .pipe($.sourcemaps.init())
            .pipe($.concat('game.min.js'))
            .pipe($.uglify())
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(dirs['dist']));
    });

    gulp.task('dist:assets', function () {
        gulp.src(globs['assets'])
            .pipe(gulp.dest(dirs['dist']));
    });

    gulp.task('dist:appcache', function () {
        return gulp.src(globs['assets'])
            .pipe(handleErrors())
            .pipe($.manifest(options['dist:appcache']))
            .pipe(gulp.dest(dirs['dist']));
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
