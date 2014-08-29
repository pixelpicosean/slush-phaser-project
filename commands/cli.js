var program = require('commander'),
    generate = require('./generate'),
    commands = require('./commands'),
    pkg = require('../package.json');

// Version
program
    .version('slush-phaser-project ' + pkg.version)
    .usage('[command] [options]\n\n  Command-Specific Help\n\n    phaser [command] --help');

// Generator
program
  .command('g')
  .alias('generate')
  .description('Generate a new extended/composed prefab')
  .usage('[type:[name|/nested/folder/to/name]]' +
      '\n\n  Available types: ' +
      '\n\n     entity         Generate composed entity' +
      '\n                    phaser g entity:star -> prefabs/star.js'+
      '\n\n     sprite         Generate extended sprite' +
      '\n                    phaser g sprite:triggers/death-area -> prefabs/triggers/death-area.js' +
      '\n\n     scene          Generate a new state' +
      '\n                    phaser g scene:credits -> scenes/credits.js')
  .action(generate);

// Run cli
program.parse(process.argv);
