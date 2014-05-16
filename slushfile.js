/*globals __dirname*/

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  inquirer = require('inquirer');

gulp.task('default', function (done) {

  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the project name'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?',
      default: false
    }
  ],
  function (answers) {
    if (!answers.moveon) {
      return done();
    }

    gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('finish', function () {
        done();
      });

  });

});
