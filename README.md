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

---

The MIT License (MIT)

Copyright (c) 2014 Matt Gale

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[node]:         http://nodejs.org/
[gulp]:         http://gulpjs.com/
[browserify]:   http://browserify.org/
[slush]:        https://github.com/klei/slush
[browsersync]:  http://www.browsersync.io/
[phaser]:       http://phaser.io/
[browserify]:   http://browserify.org/
[commonjs]:     http://wiki.commonjs.org/wiki/CommonJS
