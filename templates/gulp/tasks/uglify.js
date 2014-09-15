var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


gulp.task('uglify', [ 'scripts' ], function () {
    return gulp.src([
            './project/bower_components/almond/almond.js',

            './project/bower_components/traceur-runtime/traceur-runtime.js',
            <% if (needPIXI) { %>'./project/bower_components/phaser-official/build/custom/pixi.js',<% } %>
            './project/bower_components/phaser-official/build/<%= phaserPath %>',
            <% _.forEach(externalLibs, function(lib) { %>'./project/bower_components/phaser-official/build/custom/<%- lib %>.js',<% }); %>
            './project/game.js'
        ])
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});
