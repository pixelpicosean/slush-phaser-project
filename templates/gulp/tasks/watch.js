var gulp  = require('gulp'),
    path  = require('path');
    gutil = require('gulp-util');


function logChanges (event) {
    gutil.log(
        gutil.colors.green('File ' + event.type + ': ') +
        gutil.colors.magenta(path.basename(event.path))
    );
}


gulp.task('watch', function () {
    gulp.watch(paths['develop'] + '/js/**/*.js', [ 'scripts' ])
        .on('change', logChanges);
    gulp.watch(paths['develop'] + '/css/*.css',  [ 'styles' ])
        .on('change', logChanges);
    gulp.watch(paths['develop'] + '/index.html', [ 'html' ])
        .on('change', logChanges);
});
