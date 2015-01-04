/* globals __dirname */

module.exports = function (gulp, $, inquirer) {

    function task (answers, done) {
        var d = dest(answers.type);

        gulp.src(prefabTemplate(answers.type))
            .pipe($.template(answers))
            .pipe($.rename({ basename: answers.name }))
            .pipe($.conflict(d))
            .pipe(gulp.dest(d))
            .on('finish', done);
    }

    function prefabTemplate (type) {
        return __dirname + '/../templates/prefabs/' + type + '.js'
    }

    function dest (type) {
        switch (type) {
            case 'sprite': return 'project/scripts/prefabs';
            case 'state':  return 'project/scripts/states';
        }
    }

    var prompts = [
        {
            name: 'type',
            type: 'list',
            message: 'What kind of object to generate?',
            choices: [
                { name: 'Sprite', value: 'sprite' },
                { name: 'State',  value: 'state' }
            ],
            default: 0
        },
        {
            name: 'name',
            message: 'What will be the name of this object?'
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
        inquirer.prompt(prompts, function (answers) {
            if (!answers.proceed)
                return done();

            task(answers, done);
        });
    });

};
