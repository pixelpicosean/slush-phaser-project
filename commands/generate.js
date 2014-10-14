'use strict';

var path = require('path'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    tildify = require('tildify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

var STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g);

function camelize(str) {
    return str.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

function dashizeNameError (filename) {
    if (filename.indexOf('-') === -1) {
        gutil.log(
            gutil.colors.red('[-Error:] '),
            gutil.colors.cyan(filename),
            gutil.colors.red(' must be a dashize string. ex: my-entity')
        );
        gutil.log(
            gutil.colors.red('[-Error:]  Generate task has been canceled')
        );
        process.exit(0);
    }
}

function generatorEngine(type, srcPath, moduleName, fileName, finalPath, destPath) {

     var ext = '.js',
        fullFilePath = destPath + '/' + fileName + ext;

    // if the file has existed, it will abort the task
    if ( fs.existsSync( fullFilePath ) ) {
        gutil.log(
            gutil.colors.red('[-Error:] '),
            gutil.colors.cyan(fileName + ext),
            gutil.colors.red('has existed at '),
            gutil.colors.magenta( tildify(destPath) )
        );
        gutil.log(
            gutil.colors.red('[-Error:]  Generate task has been canceled')
        );
        process.exit(0);
    }

    /* Test only
    gutil.log(gutil.colors.green('path: ' + srcPath));
    gutil.log(gutil.colors.green('moduleName: ' + moduleName));
    gutil.log(gutil.colors.green('fileName: ' + fileName));
    gutil.log(gutil.colors.green('ext: ' + ext));
    gutil.log(gutil.colors.green('destPath: ' + destPath));
    */

    return gulp.src(srcPath)
        .pipe(replace(/__NAMESPACE__/g, moduleName))
        .pipe(rename({
            basename: fileName,
            extname: ext
        }))
        .on('end', function() {
            gutil.log(
                gutil.colors.green('[-done:] Generate'),
                gutil.colors.cyan(fileName + ext),
                gutil.colors.green('at'),
                gutil.colors.magenta(tildify(destPath))
            );
        })
        .pipe(gulp.dest(destPath));
}

function setupTask(generator) {
    //   task: gen
    //   @describe    generate an entity, sprite, scene from base template
    return gulp.task('gen', function() {
        var type = generator.type,
            name = generator.name,
            pathName = '',
            moduleName = '',
            i = 0,
            pathNested;

        if (name.indexOf('/') > -1) {
            name = name.split('/');
            pathNested = true;
        }
        else {
            pathNested = false;
        }

        // setup the fileName which used for rename module
        var fileName = pathNested ? name.pop() : name;

        // handle the error case when arg is scene:my-scene
        // scene name has to be dashized string
        // here does not handle the nested path case
        if (type === 'scene' && pathNested) {
            gutil.log(
                gutil.colors.red('[-Error:] Scenes can not be a nested')
            );
            gutil.log(
                gutil.colors.red('[-Error:] Generate task has been canceled')
            );
            process.exit(0);
        }

        if (isArray(name)) {
            // build up the nested path
            for( ; i < name.length; i++) {
                pathName += '/' + name[i];
            }
            // append fileName to the moduleName string
            moduleName += capitaliseFirstLetter(fileName);
        }
        else {
            pathName += name;
            moduleName += capitaliseFirstLetter(name);
        }

        // Append [type] at the end of moduleName
        // moduleName += capitaliseFirstLetter(type);

        // if it has dashized moduleName, it will camelize
        moduleName = camelize(moduleName);

        var srcPath = path.join(__dirname, '..', 'generators', type);
        // resolve to template with class support if needed
        /*if (fs.existsSync(path.resolve('project/js') + '/utils/class.js')) {
            srcPath += '-class';
        }*/
        srcPath += '.js';
        // console.log('srcPath: ' + srcPath);

        var dirName, finalPath, destPath;

        // if it is a string, simple call generatorEngine once
        // else it is an object(array), repeat the generatorEngine call
        if (typeof srcPath === 'string') {
            dirName = (type === 'scene') ? 'scenes' : 'prefabs';
            finalPath = pathNested ? dirName + pathName : dirName;
            destPath =  path.resolve('project/js') + '/' + finalPath;

            generatorEngine(type, srcPath, moduleName, fileName, finalPath, destPath);
        }
        // multiple file generation not support for now
        else {
            /*for (var j = 0, l = srcPath.length; j < l; j++) {
                var _type = srcPath[j].type,
                    // when original type is 'component'
                    // it will create a template file at 'templates/components' folder
                    injection = srcPath[j].injection;

                dirName = (_type.slice(-1) === 's') ? _type : _type + 's';
                dirName = (injection) ? dirName + '/' + injection : dirName;

                finalPath = pathNested ? dirName + pathName : dirName;
                destPath =  path.resolve('project/js') + '/' + finalPath;

                generatorEngine(
                    _type, srcPath[j].generatorPath, moduleName, fileName, finalPath, destPath
                );
            }*/
        }
    });
}

var generate = function(options) {

    // Error out when user did not provide any arugments
    if (argv._.length < 2) {
        gutil.log(gutil.colors.red('[-Error:] Missing type:name argument.'), 'ex: phaser g sprite:coin');
        gutil.log(gutil.colors.red('[-Error:]'), 'See \'phaser generate --help\'');
        process.exit(0);
    }

    var typeAndName = argv._.slice()[1],
        generatorAndTasks = typeAndName.length ? typeAndName.split(':') : undefined,
        validTypes = [
            'entity', 'sprite',
            'scene'
        ],
        gen;

    // Arugments must be in this format: type:name
    if (generatorAndTasks && generatorAndTasks.length > 1) {
        var type = generatorAndTasks[0],
            name = generatorAndTasks[1];

        // Type must be in the `validTypes` array
        if (validTypes.indexOf(type) > -1) {
            // Name must be a valid string
            if (name.length > 0) {
                gen = {
                    type: type,
                    name: name
                };
            }
            else {
                gutil.log(
                    gutil.colors.red('[-Error:] '),
                    gutil.colors.cyan(name),
                    gutil.colors.red(' must be a valid string.')
                );
                gutil.log(gutil.colors.red('[-Error:]'), 'See \'phaser generate --help\'');
                process.exit(0);
            }
        }
        else {
            gutil.log(
                gutil.colors.red('[-Error:] '),
                gutil.colors.cyan(type),
                gutil.colors.red(' is not a valid type.')
            );
            gutil.log(
                gutil.colors.bold('[-note:] valid types are'),
                gutil.colors.cyan(validTypes.join(', '))
            );
            process.exit(0);
        }
    }
    else {
        gutil.log(
            gutil.colors.red('[-Error:] Provide the wrong argument. It must be in this format '),
            gutil.colors.cyan('type:name'), ' ex: phaser g sprite:coin'
        );
        gutil.log(
            gutil.colors.red('[-Error:]'),
            'See \'phaser generate --help\''
        );
        process.exit(0);
    }

    setupTask(gen);
    // Trigger the generator task
    gulp.start('gen');
};

module.exports = generate;
