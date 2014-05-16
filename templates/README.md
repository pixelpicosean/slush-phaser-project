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

## Editing

When editing, make sure you update the files within the `src` directory. These files will then be compressed and added to the `bin` directory ready for publishing.

The JavaScript files have been set in a modular way using [browserify][browserify]. This means you can treat the files like you do with `node` modules.

Happy gaming!

[node]:       http://nodejs.org/
[gulp]:       http://gulpjs.com/
[browserify]: http://browserify.org/
