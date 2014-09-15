var gulp   = require('gulp'),
    gutil  = require('gulp-util');
//  imagemin = require('gulp-imagemin');


gulp.task('processAssets', function () {
    gulp.src([ 'static/assets/**' ], { baseDir: 'assets' })
        // .pipe(imagemin())
        .pipe(gulp.dest(paths.product + '/assets'))
        .on('error', gutil.log);
    gulp.src(['static/*.png', 'static/*.ico', 'static/*.xml', 'static/*.manifest'])
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});
