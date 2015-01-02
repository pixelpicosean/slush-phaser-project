var gulp         = require('gulp');
var processhtml  = require('gulp-processhtml');
var handleErrors = require('../util/handleErrors');


gulp.task('processHtml', function () {
    return gulp.src(paths['develop'] + '/index.html')
        .pipe(handleErrors())
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths['product']));
});
