var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rimraf = require('gulp-rimraf'),
  addSrc = require('gulp-add-src'),
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
    .pipe(jshint.reporter('default'))
    .on('error', function () {
      console.warn('Error: JSHint encountered an error');
    });
});

gulp.task('clean', function() {
  return gulp.src(paths.product, { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('compile', ['html', 'styles', 'scripts']);

// Development tasks
gulp.task('html', function () {});

gulp.task('styles', function () {
  return gulp.src(paths.develop + '/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.develop));
});

gulp.task('scripts', ['lint'], function () {
  return gulp.src('./project/js/**/*.js')
    .pipe(es6ModuleTranspiler({
      type: 'amd'
    }))
    .pipe(concat('game.js'))
    .pipe(gulp.dest('./project'));
});

gulp.task('watch-scripts', function () {
  return gulp.watch(paths.develop + '/js/**/*.js', function () {
    gulp.run('scripts');
  });
});

gulp.task('watch-styles', function () {
  return gulp.watch(paths.develop + '/css/*.css', function () {
    gulp.run('styles');
  });
});

gulp.task('watch-html', function () {
  return gulp.watch(paths.develop + '/index.html', function () {
    gulp.run('html');
  });
});

gulp.task('watch', ['watch-scripts', 'watch-styles', 'watch-html']);

gulp.task('server', ['compile'], function () {
  return browserSync.init([paths.develop + '/game.js', paths.develop + '/index.html', paths.develop + '/style.css'], {
    server: {
      baseDir: paths.develop
    }
  });
});

// Production tasks
gulp.task('process-html', function() {
  return gulp.src(paths.develop + '/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.product));
});

gulp.task('minifycss', function() {
  return gulp.src(paths.develop + '/css/*.css')
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.product));
});

gulp.task('uglify', ['scripts'], function () {
  return gulp.src([
      './project/bower_components/almond/almond.js',
      './project/bower_components/phaser-official/build/phaser.js',
      './project/game.js'
    ])
    .pipe(concat('game.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.product));
});

gulp.task('process-assets', function () {
  return gulp.src(['assets/*.png', 'assets/*.jpg'])
    // .pipe(imagemin())
    .pipe(gulp.dest(paths.product + '/assets'));
});

// Runnable tasks
gulp.task('default', ['compile', 'watch', 'server']);
gulp.task('build', ['clean', 'process-html', 'minifycss', 'uglify', 'process-assets']);
