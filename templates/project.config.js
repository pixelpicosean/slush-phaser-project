module.exports = {

    paths: {
        'develop': 'project',
        'static' : 'static',
        'temp'   : '.tmp',
        'product': 'dist',

        get less    () { return this['develop'] + '/less/*.less'; },
        get scripts () { return this['develop'] + '/scripts/**/*.js'; }
    }

};
