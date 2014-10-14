var gulp         = require('gulp'),
    less         = require('gulp-less'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../util/handleErrors');


gulp.task('styles', function () {
    return gulp.src(paths['less'])
        .pipe(handleErrors())
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths['temp']));
});
