/*globals __dirname*/

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  inquirer = require('inquirer'),
  shell = require('gulp-shell');

gulp.task('default', function (done) {

  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name your game (e.g. My Game)'
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'package name (e.g. my-game)',
      validate: function (input) {
        var pass = input.match(/^[A-Za-z0-9\-]+$/);
        if (pass) {
          return true;
        } else {
          return "You may only use letters, numbers and hyphens (-)";
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    },
    {
      type: 'input',
      name: 'width',
      message: 'Width',
      validate: function (input) {
        var pass = input.match(/^\d+$/);
        if (pass) {
          return true;
        } else {
          return "Please enter a valid number";
        }
      }
    },
    {
      type: 'input',
      name: 'height',
      message: 'Height',
      validate: function (input) {
        var pass = input.match(/^\d+$/);
        if (pass) {
          return true;
        } else {
          return "Please enter a valid number";
        }
      }
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?',
      default: true
    }
  ],
  function (answers) {
    if (!answers.moveon) {
      return done();
    }

    gulp.src([__dirname + '/templates/**/*.png'])
      .pipe(gulp.dest('./'));

    gulp.src([__dirname + '/templates/**', __dirname + '/templates/**/*.png'])
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .pipe(shell(['gulp']))
      .on('finish', function () {
        done();
      });

  });

});
