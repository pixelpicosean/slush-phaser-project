var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    rimraf = require('gulp-rimraf');


gulp.task('clean', function () {
    rimraf(paths.product, function (err) {
        gutil.color.red(err);
    });
});
