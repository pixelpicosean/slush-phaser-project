/*globals __dirname*/

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            default: 'Awesome Phaser',
            message: 'Name your game'
        },
        {
            type: 'input',
            name: 'packageName',
            default: 'awesome-phaser',
            message: 'package name',
            validate: function (input) {
                var pass = input.match(/^[A-Za-z0-9\-]+$/);
                if (pass) {
                    return true;
                }
                else {
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
            default: '640',
            message: 'Width',
            validate: function(input) {
                var pass = input.match(/^\d+$/);
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid number";
                }
            }
        },
        {
            type: 'input',
            name: 'height',
            default: '960',
            message: 'Height',
            validate: function(input) {
                var pass = input.match(/^\d+$/);
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid number";
                }
            }
        },
        {
            type: 'input',
            name: 'ga',
            message: 'Google Analytics Key (enter "no" to skip)',
            validate: function(input) {
                var pass = input.match(/[A-Z0-9\-o]+/);
                if (pass) {
                    return true;
                }
                else {
                    return "Please enter a valid Google Analytics Key or 'no'";
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

    function(answers) {
        if (!answers.moveon) {
            return done();
        }

        var needTemplateFilter = filter([
            '**/*.md',
            '**/*.json',
            '**/*.js',
            '**/*.html',
            '**/*.manifest'
        ]);

        gulp.src([__dirname + '/templates/**'])
            .pipe(needTemplateFilter)
            .pipe(template(answers))
            .pipe(needTemplateFilter.restore())
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('finish', function() {
                done();
            });

    });

});
