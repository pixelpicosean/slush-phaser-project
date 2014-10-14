var gulp         = require('gulp'),
    rimraf       = require('gulp-rimraf'),
    handleErrors = require('../util/handleErrors');


gulp.task('clean', function () {
    return gulp.src([ paths['temp'], paths['product'] ], { read: false })
        .pipe(handleErrors())
        .pipe(rimraf());
});
