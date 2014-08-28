var program = require('commander'),
    generate = require('./generate'),
    commands = require('./commands'),
    pkg = require('../package.json');

// Version
program
    .version('slush-phaser-project ' + pkg.version)
    .usage('[command] [options]\n\n  Command-Specific Help\n\n    phaser [command] --help');

// Run cli
program.parse(process.argv);
