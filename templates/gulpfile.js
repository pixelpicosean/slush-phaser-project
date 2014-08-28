var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    processhtml = require('gulp-processhtml'),
    minifycss = require('gulp-minify-css'),
    es6ModuleTranspiler = require('gulp-es6-module-transpiler'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    // imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream');

var paths = {
    develop: 'project',
    product: 'dist'
};

// General tasks
gulp.task('lint', function () {
    return gulp.src([paths.develop + '/js/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .on('error', function () {
            console.warn('Error: JSHint encountered an error');
        });
});

gulp.task('clean', function() {
    rimraf(paths.product, function(err) {
        gutil.color.red(err);
    });
});

gulp.task('compile', ['html', 'styles', 'scripts']);

// Development tasks
gulp.task('html', function () {
    return gulp.src(paths.develop + '/index.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function () {
    return gulp.src(paths.develop + '/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.develop))
        .pipe(browserSync.reload({ stream: true}))
        .on('error', gutil.log);
});

gulp.task('scripts', ['lint'], function () {
    return gulp.src(paths.develop + '/js/**/*.js')
        .pipe(plumber(function(error) {
            gutil.colors.red(error.message);
            this.emit('end');
        }))
        .pipe(es6ModuleTranspiler({
            type: 'amd'
        }))
        .pipe(concat('game.js'))
        .pipe(gulp.dest('./project'))
        .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('watch', function() {
    gulp.watch(paths.develop + '/js/**/*.js', ['scripts']);
    gulp.watch(paths.develop + '/css/*.css', ['styles']);
    gulp.watch(paths.develop + '/index.html', ['html']);
});

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: paths.develop
        }
    });
});

// Production tasks
gulp.task('process-html', function() {
    return gulp.src(paths.develop + '/index.html')
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});

gulp.task('minifycss', function() {
    return gulp.src(paths.develop + '/css/*.css')
        .pipe(minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});

gulp.task('uglify', ['scripts'], function () {
    return gulp.src([
            './project/bower_components/almond/almond.js',
            './project/bower_components/phaser-official/build/<%= phaserPath %>',
            <% _.forEach(externalLibs, function(lib) { %>'./project/bower_components/phaser-official/build/custom/<%- lib %>.js',<% }); %>
            './project/game.js'
        ])
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});

gulp.task('process-assets', function () {
    gulp.src(['project/assets/*.png', 'project/assets/*.jpg', 'project/assets/*.gif'])
        // .pipe(imagemin())
        .pipe(gulp.dest(paths.product + '/assets'))
        .on('error', gutil.log);
    gulp.src(['project/*.png', 'project/*.ico', 'project/*.xml', 'project/*.manifest'])
        .pipe(gulp.dest(paths.product))
        .on('error', gutil.log);
});

// Runnable tasks
gulp.task('default', ['compile', 'watch', 'server']);
gulp.task('build', ['clean', 'process-html', 'minifycss', 'uglify', 'process-assets']);
