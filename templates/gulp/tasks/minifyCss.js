var gulp         = require('gulp');
var less         = require('gulp-less');
var rename       = require('gulp-rename');
var minifycss    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');


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
