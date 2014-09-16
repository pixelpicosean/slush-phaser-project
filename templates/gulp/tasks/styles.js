var gulp        = require('gulp'),
    less        = require('gulp-less'),
    gutil       = require('gulp-util'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync');


gulp.task('styles', function () {
    return gulp.src(paths['less'])
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths['temp']))
        .pipe(browserSync.reload({ stream: true }))
        .on('error', gutil.log);
});
