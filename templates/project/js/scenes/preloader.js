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

    var bmd = game.add.bitmapData(game.width, game.height);
    bmd.context.fillStyle = '#fff';
    bmd.context.fillRect(0, game.height - 10, game.width, 10);
    bmd.dirty = true;

    this.loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, bmd);
    this.load.setPreloadSprite(this.loadingBar);

    // load any other assets here
  },

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'preloader');

    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    game.state.start('mainMenu', true, false);
  }

};
