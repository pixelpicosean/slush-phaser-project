require(__dirname + '/lib/loadGenerators')(

    __dirname + '/generators',

    [
        'inquirer',
        'underscore',
        'underscore.string'
    ],

    'project-config.json',

    __dirname + '/defaults.json'

);
