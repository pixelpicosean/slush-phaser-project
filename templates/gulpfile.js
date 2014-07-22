var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rimraf = require('gulp-rimraf'),
  processhtml = require('gulp-processhtml'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  browserify = require('browserify'),
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
  var bundleStream = browserify('./project/js/base.js').bundle();

  bundleStream
    .pipe(source('game.js'))
    .pipe(gulp.dest(paths.develop));
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
  return browserSync.init(['game.js', 'index.html', 'style.css'], {
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

gulp.task('uglify', ['lint'], function () {
  var bundleStream = browserify(paths.develop + '/js/base.js').bundle();

  bundleStream
    .pipe(source('game.js'))
    .pipe(gulp.dest(path.product))
    .pipe(uglify({ outSourceMaps: false }))
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
