var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    rimraf = require('gulp-rimraf');


gulp.task('clean', function () {
    return gulp.src([ paths['product'] ], { read: false })
        .pipe(rimraf())
        .on('error', function (err) {
            gutil.colors.red(err);
        });
});
