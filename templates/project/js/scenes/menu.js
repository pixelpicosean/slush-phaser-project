/**
 * @class mainMenu
 * A Phaser scene
 */
var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  create: function () {
    game.analytics.trackEvent('scene', 'create', 'mainMenu');

    // set the background colour
    game.stage.backgroundColor = '#4488cc';
  },

  addPointerEvents: function () {
    // add an input listener
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    // go to the main game scene
    game.state.start('game', true, false);
  }

};
