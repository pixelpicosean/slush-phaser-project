var fs   = require('fs');
var path = require('path');
var us   = require('underscore.string');

module.exports = {

    loadProjectConfig: function (filename) {
        var projectConfigFile = path.join(process.cwd(), filename);

        if (fs.existsSync(projectConfigFile))
            return require(projectConfigFile);

        return null;
    },

    loadDependencies: function (dependencies) {
        return dependencies
            .reduce(function (memo, name) {
                var camelized = us.camelize(name);
                memo[camelized] = require(name);

                return memo;
            }, {});
    }

};
