var gulp         = require('gulp'),
    del          = require('del'),
    handleErrors = require('../util/handleErrors');


gulp.task('clean', function (done) {
    del([
        paths['temp'], paths['product']
    ], done);
});
