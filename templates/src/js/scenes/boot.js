/**
 * @class boot
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */
var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  preload: function () {

    // add any images for the pre-loader here

  },

  create: function () {

    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.state.start('preloader', true, false);
  }

};
