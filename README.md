# Phaser Slush Generator

**Note: this is a folk which will look very different from the origin** 

A starting point to build a game with [Phaser][phaser], using "ES6 modules" to organise your code.

Parts included:

- [Phaser][phaser]: to build your games with
- [ES6 Module Transpiler][es6-module-transpiler]: to organise your code in future format
- [BrowserSync][browsersync]: for automatically dev reload
- [Google Analytics][analytics]: for tracking

## Pre-requesits

You will need to have [node][node], [gulp][gulp] and [slush][slush] setup on your machine.

## Installing Slush template

To install the generator, clone this folk(not the original one), then run the following command.

```sh
cd slush-phaser-node
npm link
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

When editing, make sure you update the files within the `project` directory. These files will then be compressed and added to the `dist` directory ready for publishing.

The JavaScript files have been set in a modular way using [es6-module-transpiler][es6-module-transpiler]. This means you can use the future module system.

### Analytics

Google analytics have been included so that you can track user actions. This is useful for seeing how far the user gets, which in turn will alert you to any bugs or levels that are impossible to complete.

To track an event, just add the following code anywhere in your game:

``` javascript
game.analytics.trackEvent('action', 'label', 'value');
```

Only the action is required, but you may want to add extra options, such as health, level or simply what just happend.

Happy coding!

---

The MIT License (MIT)

Copyright (c) 2014 Matt Gale, Sean Bohan

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
