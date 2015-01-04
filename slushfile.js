var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var inquirer   = require('inquirer');
var generators = require('require-dir')('./generators');


Object.keys(generators).forEach(function (generatorName) {
    if (typeof generators[generatorName] === 'function')
        generators[generatorName](gulp, plugins, inquirer);
});
