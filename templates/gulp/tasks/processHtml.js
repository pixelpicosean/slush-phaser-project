var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    processhtml  = require('gulp-processhtml'),
    handleErrors = require('../util/handleErrors');


gulp.task('processHtml', function () {
    return gulp.src(paths['develop'] + '/index.html')
        .pipe(handleErrors())
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths['product']));
});
