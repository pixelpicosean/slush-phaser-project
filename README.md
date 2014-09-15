# Phaser Slush Generator

[![NPM](https://nodei.co/npm/slush-phaser-project.png?global=true)](https://nodei.co/npm/slush-phaser-project/)

[![NPM version][npm-image]][npm-url]    [![Dependency Status][dependency-image]][dependency-url]

> A starting point to build a game with [Phaser][phaser], using "ES6 modules" to organise your code.

## Features

- easy workflow lets you focus on crafting awesome games
- ES6 module support for the future
- Scene(state) and prefab generator
- gulp (a build tool of choice) build insanely fast via node stream api
- lighting fast development rebuild system
- live reload on all resources
- deploy with one line command

Frameworks and tools used to make it possible:

- [Node.js][node]: makes anything possible :D
- [Slush][slush]: generates whole project
- [Gulp][gulp]: constructs your work flow
- [Phaser][phaser]: lets you craft awesome games
- [ES6 Module Transpiler][es6-module-transpiler]: organises your code in future format
- [BrowserSync][browsersync]: for automatically dev reload
- [Google Analytics][analytics]: lets you track informations from players

## Things upcoming
 
 - Default multi screen support for mobile and desktop
 - Code generator for subclasses

## Pre-requesits

You will need to have [node][node], [gulp][gulp] and [slush][slush] setup on your machine.

## How to install

Simply run the following command:
```
npm install -g slush-phaser-project
```

## Getting started

### Basic

Navigate to where you want to develop your game (you can create a new folder too if you like).

```sh
$ cd /path/to/folder
$ mkdir myGreatGame
$ cd ./myGreatGame
```

Then call the [slush][slush] template to begin.

```sh
$ slush phaser-project
```

Finally run [gulp][gulp] to launch a server.

```sh
$ gulp
```

### Generator

After installed there should be a `phaser` command in your PATH, try `phaser --version` to check it.
Now there's only generator support from the cli command, maybe project or some other features will be added, but I dont have any idea about that. *Feel free to tell me what you think :D*

**NOTE:** to make generator work as you want, please locate to **`GAME_ROOT`** instead of **`GAME_ROOT/project`**

    phaser [command] [options]

    Commands:
        g|generate         // Generate a new scene/prefab with ES6 support       

    Options:
        -h, --help     output usage information
        -V, --version  output the version number

    Command-Specific Help:
        phaser [command] --help

#### Sample Usage

Generate a new scene called `Credits`:
```sh
phaser g scene:credits
```

Generate a new sprite prefab `Trigger`:
```sh
phaser g sprite:trigger
```

Generate a new sprite prefab `Radar` in `prefabs/triggers` folder:
```sh
phaser g sprite:triggers/radar
```

## Workflow

> The workflow introduced below is recommended but not forced which will just make your life easier :D

There're 2 folders **"design"** and **"media"** created at root path, both of them are empty by default.

The **"design"** folder is made for your game design docs, graphs and sketches.

The **"media"** folder is for your original assets(ai, psd, wav...). You may process them with tools like TexturePacker, Audacity... to phaser friendly formats(png, ogg...) and put them into `project/assets` for use.

When **editing source code**, make sure you update the files within the `project` directory. These files will then be compiled and reload for developing or compressed and added to the `dist` directory for publishing.

The JavaScript files have been set in a modular way using [es6-module-transpiler][es6-module-transpiler]. This means your code modules are managed in the future format.

### Analytics

Google analytics have been included so that you can track user actions. This is useful for seeing how far the user gets, which in turn will alert you to any bugs or levels that are impossible to complete.

To track an event, just add the following code anywhere in your game:

``` javascript
game.analytics.trackEvent('action', 'label', 'value');
```

Only the action is required, but you may want to add extra options, such as health, level or simply what just happend.

## Why ES6 instead of AMD or CJS?

> "Perhaps by early 2015 we ought to be looking at going purely ES6? Moving to using more advanced native browser features like Object.observe and Promises." -- Richard, the author of Phaser.io

## TODO
See [Issues][issues] and [Milestones][milestones]

Happy coding!

---

The MIT License (MIT)

Copyright (c) 2014 Sean Bohan

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
[slush]:        https://github.com/klei/slush
[browsersync]:  http://www.browsersync.io/
[phaser]:       http://phaser.io/
[es6-module-transpiler]:     https://github.com/square/es6-module-transpiler
[analytics]:    http://www.google.com/analytics/

[npm-url]: https://www.npmjs.org/package/slush-phaser-project
[npm-image]: http://img.shields.io/npm/v/npm.svg

[dependency-image]: http://img.shields.io/david/strongloop/express.svg
[dependency-url]: https://david-dm.org/pixelpicosean/slush-phaser-project

[issues]: https://github.com/pixelpicosean/slush-phaser-project/issues
[milestones]: https://github.com/pixelpicosean/slush-phaser-project/milestones
