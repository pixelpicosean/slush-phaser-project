var gulp        = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('html', function () {
    return gulp.src(paths.develop + '/index.html')
        .pipe(browserSync.reload({ stream: true }));
});
