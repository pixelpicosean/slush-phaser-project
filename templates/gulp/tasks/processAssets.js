var gulp   = require('gulp'),
    gutil  = require('gulp-util');
//  imagemin = require('gulp-imagemin');


gulp.task('processAssets', function () {
    gulp.src(['project/assets/**/*'])
        // .pipe(imagemin())
        .pipe(gulp.dest(paths.product + '/assets'))
        .on('error', gutil.log);
    gulp.src(['project/*.png', 'project/*.ico', 'project/*.xml', 'project/*.manifest'])
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});
