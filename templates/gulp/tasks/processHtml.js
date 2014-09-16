var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    processhtml = require('gulp-processhtml');


gulp.task('processHtml', function () {
    return gulp.src(paths['develop'] + '/index.html')
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths['product']))
        .on('error', gutil.log);
});
