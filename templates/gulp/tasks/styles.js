var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync');


gulp.task('styles', function () {
    return gulp.src(paths.develop + '/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.develop))
        .pipe(browserSync.reload({ stream: true }))
        .on('error', gutil.log);
});
