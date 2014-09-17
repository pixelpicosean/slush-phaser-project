var gulp         = require('gulp'),
    handleErrors = require('../util/handleErrors');


gulp.task('processAssets', function () {
    gulp.src([ 'static/assets/**' ], { baseDir: 'assets' })
        .pipe(handleErrors())
        .pipe(gulp.dest(paths['product'] + '/assets'));
    gulp.src(['static/*.png', 'static/*.ico', 'static/*.xml', 'static/*.manifest'])
        .pipe(handleErrors())
        .pipe(gulp.dest(paths['product']));
});
