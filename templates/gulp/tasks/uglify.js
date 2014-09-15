var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


gulp.task('uglify', [ 'scripts' ], function () {
    return gulp.src([
            './static/bower_components/almond/almond.js',

            './static/bower_components/traceur-runtime/traceur-runtime.js',
            <% if (needPIXI) { %>'./static/bower_components/phaser-official/build/custom/pixi.js',<% } %>
            './static/bower_components/phaser-official/build/<%= phaserPath %>',
            <% _.forEach(externalLibs, function(lib) { %>'./static/bower_components/phaser-official/build/custom/<%- lib %>.js',<% }); %>
            './project/game.js'
        ])
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});
