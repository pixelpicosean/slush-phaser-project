var gulp      = require('gulp'),
    less      = require('gulp-less'),
    gutil     = require('gulp-util'),
    rename    = require('gulp-rename'),
    minifycss = require('gulp-minify-css');


gulp.task('minifyCss', function () {
    return gulp.src(paths['less'])
        .pipe(less())
        .pipe(minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths['product']))
        .on('error', gutil.log);
});
