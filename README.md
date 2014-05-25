# Phaser Slush Generator

A starting point to build a game with [Phaser][phaser], using [CommonJS modules][commonjs] to organise your code.

Parts included:

- [Phaser][phaser]: to build your games with
- [Browserify][browserify]: to organise your code in a CommonJS format
- [BrowserSync][browsersync]: to test your code

## Pre-requesits

You will need to have [node][node], [gulp][gulp] and [slush][slush] setup on your machine.

## Installing Slush template

To install the generator, run the following command, making sure you use the global tag.

```sh
npm install -g slush-phaser-node
```

## Getting started

Navigate to where you want to develop your game (you can create a new folder too if you like).

```sh
$ cd /path/to/folder
$ mkdir myGreatGame
$ cd ./myGreatGame
```


Then call the [slush][slush] template to begin.

```sh
$ slush phaser-node
```


Finally run [gulp][gulp] to launch a server.

```sh
$ gulp
```

## Editing

When editing, make sure you update the files within the `src` directory. These files will then be compressed and added to the `bin` directory ready for publishing.

The JavaScript files have been set in a modular way using [browserify][browserify]. This means you can treat the files like you do with `node` modules.

Happy coding!

[node]:         http://nodejs.org/
[gulp]:         http://gulpjs.com/
[browserify]:   http://browserify.org/
[slush]:        https://github.com/klei/slush
[browsersync]:  http://www.browsersync.io/
[phaser]:       http://phaser.io/
[browserify]:   http://browserify.org/
[commonjs]:     http://wiki.commonjs.org/wiki/CommonJS
