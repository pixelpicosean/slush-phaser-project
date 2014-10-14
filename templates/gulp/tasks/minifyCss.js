var gulp         = require('gulp'),
    less         = require('gulp-less'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css'),
    handleErrors = require('../util/handleErrors');


gulp.task('minifyCss', function () {
    return gulp.src(paths['less'])
        .pipe(handleErrors())
        .pipe(less())
        .pipe(minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths['product']));
});
