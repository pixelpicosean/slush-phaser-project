var _       = require('underscore');
var fs      = require('fs');
var path    = require('path');
var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();


function loadDependencies (dependencies) {
    return dependencies.reduce(function (memo, name) {
        memo[name] = require(name);
        return memo;
    }, {});
}


function loadConfig (configFile, defaults) {
    var config = {};
    var configFile = path.join(process.cwd(), configFile);

    if (fs.existsSync(configFile))
        config = require(configFile);

    return _.extend(require(defaults), config);
}


function loadGenerators (dir, dependencies, config) {
    var generators = require('require-dir')(dir);

    Object.keys(generators)
        .map(function (key) { return generators[key] })
        .filter(function (generator) { return typeof generator === 'function' })
        .forEach(function (generator) {
            generator(gulp, plugins, dependencies, config);
        });
}


module.exports = function (dir, dependencies, config, defaults) {
    loadGenerators(
        dir,
        loadDependencies(dependencies),
        loadConfig(config, defaults)
    );
};
