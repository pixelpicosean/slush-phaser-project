var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    traceur     = require('gulp-traceur'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');


gulp.task('scripts', [ 'lint' ], function () {
    return gulp.src(paths.develop + '/js/**/*.js')
        .pipe(plumber(function (error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(traceur({
            modules: 'amd',
            moduleName: true
        }))
        .pipe(concat('game.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./project'))
        .pipe(browserSync.reload({ stream: true, once: true }));
});
