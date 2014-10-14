var gulp         = require('gulp'),
    del          = require('del'),
    handleErrors = require('../util/handleErrors');


gulp.task('clean', function () {
    del([
        paths['temp'], paths['product']
    ]);
});
