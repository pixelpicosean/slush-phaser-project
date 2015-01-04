var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var generators = require('require-dir')('./generators');

var dependencies = {
    'inquirer' : require('inquirer')
};

Object.keys(generators)
    .map(function (key) { return generators[key] })
    .filter(function (obj) { return typeof obj === 'function' })
    .forEach(function (generator) {
        generator(gulp, plugins, dependencies)
    });
