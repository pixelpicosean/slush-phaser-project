var gulp         = require('gulp');
var concat       = require('gulp-concat');
var traceur      = require('gulp-traceur');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', [ 'lint' ], function () {
    return gulp.src(paths['scripts'])
        .pipe(handleErrors())
        .pipe(sourcemaps.init())
        .pipe(traceur({
            modules: 'register',
            moduleName: true
        }))
        .pipe(concat('game.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths['temp']))
        .pipe(browserSync.reload({ stream: true }));
});
