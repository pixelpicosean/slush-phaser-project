var gulp = require('gulp');


gulp.task('watch', function () {
    gulp.watch(paths['scripts'],                 [ 'scripts' ]);
    gulp.watch(paths['less'],                    [  'styles' ]);
    gulp.watch(paths['develop'] + '/index.html', [    'html' ]);
});
