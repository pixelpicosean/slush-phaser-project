/* globals __dirname */

module.exports = function (gulp, $, inquirer) {
    gulp.task('default', function (done) {

        inquirer.prompt([
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
                validate: function (input) {
                    var pass = input.match(/^[A-Za-z0-9\-]+$/);
                    if (pass) {
                        return true;
                    }
                    else {
                        return "You may only use letters, numbers and hyphens (-)";
                    }
                }
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
                validate: function(input) {
                    var pass = input.match(/^\d+$/);
                    if (pass) {
                        return true;
                    }
                    else {
                        return "Please enter a valid number";
                    }
                }
            },
            {
                type: 'input',
                name: 'height',
                default: '640',
                message: 'Height',
                validate: function(input) {
                    var pass = input.match(/^\d+$/);
                    if (pass) {
                        return true;
                    }
                    else {
                        return "Please enter a valid number";
                    }
                }
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
                validate: function(input) {
                    var pass = input.match(/[A-Z0-9\-o]+/);
                    if (pass) {
                        return true;
                    }
                    else {
                        return "Please enter a valid Google Analytics Key or 'no'";
                    }
                }
            },
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Continue?',
                default: true
            }
        ],

        function(answers) {
            if (!answers.moveon) {
                return done();
            }

            var needTemplateFilter = $.filter([
                '**/*.md',
                '**/*.json',
                '**/*.js',
                '**/*.html',
                '**/*.manifest'
            ]);

            // Config phaser path
            var phaserPaths = {
                'all': 'phaser.js',
                'none': 'custom/phaser-no-libs.js',
                'arcade': 'custom/phaser-arcade-physics.js',
                '?': 'custom/phaser-no-libs.js'
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

            gulp.src(__dirname + '/../templates/default/**')
                .pipe(needTemplateFilter)
                .pipe($.template(answers))
                .pipe(needTemplateFilter.restore())
                .pipe($.rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe($.conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe($.install())
                .on('finish', function() {
                    done();
                });

        });

    });
};
