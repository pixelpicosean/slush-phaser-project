# <%= name %>

<%= description %>

## Pre-requesits

You will need to have [node][node] and [gulp][gulp] setup on your machine.

## Getting started

To package all source files and run on a local server simply run the following command:

```sh
$ gulp
```

This should open a browser window with the game running locally. You can copy the address and paste it into any browser on your local network (including mobiles and tablets).

## Scaffold
* design (game design document goes here)
* media (folder for your assets source...)
* gulp (gulp tasks folder)
* project (contains scripts, stylesheets and index.html)
* static/assets (image and sound files, use 'assets/file_name' in source code)
    - graphic
    - music
    - sound

## Editing

When editing, make sure you update the files within the `project` directory. These files will then be compressed and added to the `dist` directory ready for publishing.

ECMAScript 6 features are supported with help of [Traceur][Traceur]. This means you can write code with syntax which is going to be supported officially by Phaser 3.

Happy building games!

[node]:       http://nodejs.org/
[gulp]:       http://gulpjs.com/
[Traceur]:    https://github.com/google/traceur-compiler
