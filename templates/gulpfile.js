/*
 *  gulpfile.js
 *  ===========
 *
 *  Rather than manage one giant configuration file responsible
 *  for creating multiple tasks, each task has been broken out into
 *  its own file in gulp/tasks. Any files in that directory get
 *  automatically required below.
 *
 *  To add a new task, simply add a new task file in that directory.
 *  gulp/tasks/default.js specifies the default set of tasks to run
 *  when you run `gulp`.
 *
 */

var requireDir = require('require-dir');


// Specify game project paths for tasks.
global[ 'paths' ] = {
    'develop': 'project',
    'static' : 'static',
    'temp'   : '.tmp',
    'product': 'dist',

    get less    () { return this['develop'] + '/less/*.less'; },
    get scripts () { return this['develop'] + '/scripts/**/*.js'; }
};

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
