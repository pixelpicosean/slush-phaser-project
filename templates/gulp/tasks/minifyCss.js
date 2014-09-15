var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    rename    = require('gulp-rename'),
    minifycss = require('gulp-minify-css');


gulp.task('minifyCss', function () {
    return gulp.src(paths.develop + '/css/*.css')
        .pipe(minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});
