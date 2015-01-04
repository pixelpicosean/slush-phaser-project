/* globals __dirname */

module.exports = function (gulp, $, dependencies, config) {

    var _        = dependencies['underscore.string'];
    var inquirer = dependencies['inquirer'];

    function task (answers, done) {
        var outDir    = dest(answers.type);
        var className = _.capitalize(_.camelize(answers.name));

        answers.className = className;

        gulp.src(prefabTemplate(answers.type))
            .pipe($.template(answers))
            .pipe($.rename({ basename: className }))
            .pipe($.conflict(outDir))
            .pipe(gulp.dest(outDir))
            .on('finish', done);
    }

    function result (done) {
        return function (answers) {
            if (!answers.proceed)
                return done();

            task(answers, done);
        };
    }

    function validateInput (regexp, errorMsg) {
        return function (input) {
            return !!input.match(regexp) || errorMsg;
        };
    }

    function prefabTemplate (type) {
        return __dirname + '/../templates/prefabs/' + type + '.js'
    }

    function dest (type) {
        switch (type) {
            case 'state' : return config.dirs.states;
            case 'sprite': return config.dirs.prefabs;
        }
    }

    var prompts = [
        {
            name: 'type',
            type: 'list',
            message: 'Which class you want to extend?',
            choices: [
                { name: 'Phaser.Sprite', value: 'sprite' },
                { name: 'Phaser.State',  value: 'state' }
            ],
            default: 0
        },
        {
            name: 'name',
            message: 'What will be the name of this object?',
            validate: validateInput(/^[a-z][a-z0-9\-_ ]+$/i, 'Invalid name')
        },
        {
            name: 'key',
            message: 'Which key does this prefab use?',
            when: function (answers) {
                return answers['type'] === 'sprite';
            }
        },
        {
            name: 'proceed',
            type: 'confirm',
            message: 'Continue?',
            default: true
        }
    ];

    gulp.task('prefab', function (done) {
        inquirer.prompt(prompts, result(done));
    });

};
