/**
 * @class preloader
 * A Phaser scene
 */
var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  preload: function () {
    game.analytics.trackEvent('scene', 'preload', 'preloader');

    game.stage.backgroundColor = '#4488cc';

    // load any other assets here
  },

  create: function () {
    game.analytics.trackEvent('scene', 'create', 'preloader');
  },

  startMainMenu: function () {
    game.state.start('menu', true, false);
  }

};
