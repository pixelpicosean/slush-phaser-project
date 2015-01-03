var gulp   = require('gulp');
var tasks  = require('require-dir')('./gulp/tasks');
var config = global[ 'paths' ] = require('./project.config');

for (var task in tasks)
    tasks[task](gulp, null, config);
