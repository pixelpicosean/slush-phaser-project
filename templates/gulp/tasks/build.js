var gulp = require('gulp');


// Use `gulp build` when you're ready to distribute your game.
gulp.task('build', [
    'clean',
    'processHtml',
    'minifyCss',
    'uglify',
    'processAssets'
]);
