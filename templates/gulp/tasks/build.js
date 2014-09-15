var gulp        = require('gulp'),
    runSequence = require('run-sequence');


gulp.task('build', function (done) {
    runSequence('clean', [
        'processHtml',
        'minifyCss',
        'uglify',
        'processAssets'
    ], done);
});
