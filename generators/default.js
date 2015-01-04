/* globals __dirname */

module.exports = function (gulp, $, inquirer) {

    function task (answers, done) {
        var filter = $.filter('**/*.{md,js,json,html,manifest}');
        phaserLibs(answers);

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

    function validateInput (regexp, errorMsg) {
        return function (input) {
            return !!input.match(regexp) || errorMsg;
        };
    }

    function renameHiddenFile (file) {
        if (file.basename[0] === '_')
            file.basename = '.' + file.basename.slice(1);
    }

    function phaserLibs (answers) {
        // Config phaser path
        var phaserPaths = {
            'all'   : 'phaser.js',
            'none'  : 'custom/phaser-no-libs.js',
            'arcade': 'custom/phaser-arcade-physics.js',
            '?'     : 'custom/phaser-no-libs.js'
        };

        answers.phaserPath = phaserPaths[answers['phaserCustom']];
        answers.externalLibs = answers.externalLibs || [];
        answers.needPIXI = false;

        // Config included physics libs
        if (answers['phaserCustom'] === '?') {
            // Choose all the 3 ?!
            if (answers['externalLibs'].length === 3) {
                answers.phaserPath = phaserPaths['all'];
                // Donot duplicate
                answers['externalLibs'].length = 0;
            }
            else {
                // Reset phaser path to the arcade one if arcade choosed
                var index = answers['externalLibs'].indexOf('arcade');
                if (index !== -1) {
                    answers.phaserPath = phaserPaths['arcade'];
                    answers['externalLibs'].splice(index, 1);
                }
                else {
                    // Add pixi.js if use "phaser-no-libs"
                    answers.needPIXI = true;
                }
            }
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
            name: 'phaserCustom',
            message: 'Choose physics systems you want, including those you MAY use in the future',
            choices: [
                { name: 'Only arcade (Recommended)', value: 'arcade' },
                { name: 'All', value: 'all' },
                { name: 'Customise', value: '?' },
                { name: 'No physics support', value: 'none' }
            ],
            default: 0
        },
        {
            type: 'checkbox',
            name: 'externalLibs',
            message: 'Select libs you want to use',
            choices: [
                { name: 'Arcade', value: 'arcade', checked: true },
                { name: 'P2', value: 'p2' },
                { name: 'Ninja', value: 'ninja' }
            ],
            when: function(answers) {
                return (answers['phaserCustom'] === '?');
            }
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
        inquirer.prompt(prompts, function(answers) {
            if (!answers.proceed)
                return done();

            task(answers, done);
        });
    });

};
