/* globals __dirname */

module.exports = function (gulp, $, dependencies, config) {

    var _        = dependencies['underscore'];
    var inquirer = dependencies['inquirer'];
    _.str        = dependencies['underscore.string'];

    function task (answers, done) {
        var filter = $.filter('**/*.{md,js,json,html,manifest}');

        gulp.src(__dirname + '/../templates/default/**')
            .pipe(filter)
            .pipe($.template(answers))
            .pipe(filter.restore())
            .pipe($.rename(renameHiddenFile))
            .pipe($.conflict('.'))
            .pipe(gulp.dest('.'))
            .pipe($.install())
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

    function renameHiddenFile (file) {
        if (file.basename[0] === '_')
            file.basename = '.' + file.basename.slice(1);
    }

    function filterPhysicsEngine (choice) {
        switch (choice) {
            case 'arcade'  : return 'build/custom/phaser-arcade-physics.js';
            case 'standard': return 'build/phaser.js';
            case 'ninja'   : return 'build/custom/phaser-ninja-physics.js';
            case 'none'    : return 'build/custom/phaser-no-physics.js';
        }
    }

    var prompts = [
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
            validate: validateInput(/^[A-Za-z0-9\-]+$/, "You may only use letters, numbers and hyphens (-)")
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description'
        },
        {
            type: 'input',
            name: 'width',
            default: '960',
            message: 'Width',
            validate: validateInput(/^\d+$/, "Please enter a valid number")
        },
        {
            type: 'input',
            name: 'height',
            default: '640',
            message: 'Height',
            validate: validateInput(/^\d+$/, "Please enter a valid number")
        },
        {
            type: 'list',
            name: 'physicsEngine',
            message: 'Choose which physics engines you will use',
            choices: [
                { name: 'Arcade only (default, recommended)', value: 'arcade'   },
                { name: 'P2 with Arcade (standard)'         , value: 'standard' },
                { name: 'Ninja with Arcade'                 , value: 'ninja'    },
                { name: 'Do not include any physics engine' , value: 'none'     },
            ],
            filter: filterPhysicsEngine,
            default: 0
        },
        {
            type: 'input',
            name: 'ga',
            message: 'Google Analytics Key (enter "no" to skip)',
            validate: validateInput(/[A-Z0-9\-o]+/, "Please enter a valid Google Analytics Key or 'no'")
        },
        {
            type: 'confirm',
            name: 'proceed',
            message: 'Continue?',
            default: true
        }
    ];

    gulp.task('default', function (done) {
        inquirer.prompt(prompts, result(done));
    });

};
