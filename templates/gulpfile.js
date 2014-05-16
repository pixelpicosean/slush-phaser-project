/*globals require, console*/

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream')/*,
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify')*/;

gulp.task('default', ['compile', 'watch', 'server']);

gulp.task('compile', ['scripts', 'markup', 'assets']);

gulp.task('scripts', ['script-compile']);

gulp.task('script-hints', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', function () {
      console.warn('Error: JSHint encountered an error');
    });
});

gulp.task('script-compile', ['script-hints'], function () {
  var bundleStream = browserify('./src/js/base.js').bundle();

  bundleStream
    .pipe(source('bundle.js'))
    /*.pipe(streamify(uglify()))*/
    .pipe(gulp.dest('bin/js'));
});

gulp.task('markup', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('bin'));
});

gulp.task('assets', function () {
  return gulp.src(['src/assets/*.png', 'src/assets/*.jpg'])
    .pipe(imagemin())
    .pipe(gulp.dest('bin/assets'));
});

gulp.task('watch', ['watch-scripts', 'watch-markup']);

gulp.task('watch-scripts', function () {
  return gulp.watch('src/js/**/*.js', function () {
    gulp.run('scripts');
  });
});

gulp.task('watch-markup', function () {
  return gulp.watch('src/index.html', function () {
    gulp.run('markup');
  });
});

gulp.task('server', ['compile'], function () {
  return browserSync.init(['bin/js/*.js', 'bin/index.html'], {
    server: {
      baseDir: './bin'
    }
  });
});
