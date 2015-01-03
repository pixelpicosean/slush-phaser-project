var del          = require('del');
var runSequence  = require('run-sequence');
var handleErrors = require('../util/handleErrors');


module.exports = function (gulp, $, config) {

    var paths = config.paths;

    gulp.task('clean', function (done) {
        del([
            paths['temp'], paths['product']
        ], done);
    });

    gulp.task('processHtml', function () {
        return gulp.src(paths['develop'] + '/index.html')
            .pipe(handleErrors())
            .pipe($.processhtml('index.html'))
            .pipe(gulp.dest(paths['product']));
    });

    gulp.task('minifyCss', function () {
        return gulp.src(paths['less'])
            .pipe(handleErrors())
            .pipe($.less())
            .pipe($.minifyCss({
                keepSpecialComments: false,
                removeEmpty: true
            }))
            .pipe($.rename('style.min.css'))
            .pipe(gulp.dest(paths['product']));
    });

    gulp.task('uglify', [ 'scripts' ], function () {
        return gulp.src([
                './static/bower_components/traceur-runtime/traceur-runtime.js',
                <% if (needPIXI) { %>'./static/bower_components/phaser-official/build/custom/pixi.js',<% } %>
                './static/bower_components/phaser-official/build/<%= phaserPath %>',
                <% _.forEach(externalLibs, function(lib) { %>'./static/bower_components/phaser-official/build/custom/<%- lib %>.js',<% }); %>
                './.tmp/game.js'
            ])
            .pipe($.sourcemaps.init())
            .pipe($.concat('game.min.js'))
            .pipe($.uglify())
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(paths['product']));
    });

    gulp.task('processAssets', function () {
        gulp.src([
            'static/**',
            '!static/bower_components',     // Workaround to ensure both directory
            '!static/bower_components/**'   // and its contents don't get copied.
        ])
            .pipe(handleErrors())
            .pipe(gulp.dest(paths['product']));
    });

    gulp.task('build', function (done) {
        runSequence('clean', [
            'processHtml',
            'minifyCss',
            'uglify',
            'processAssets'
        ], done);
    });

};
