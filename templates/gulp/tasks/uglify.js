var gulp       = require('gulp');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('uglify', [ 'scripts' ], function () {
    return gulp.src([
            './static/bower_components/traceur-runtime/traceur-runtime.js',
            <% if (needPIXI) { %>'./static/bower_components/phaser-official/build/custom/pixi.js',<% } %>
            './static/bower_components/phaser-official/build/<%= phaserPath %>',
            <% _.forEach(externalLibs, function(lib) { %>'./static/bower_components/phaser-official/build/custom/<%- lib %>.js',<% }); %>
            './.tmp/game.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('game.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths['product']));
});
