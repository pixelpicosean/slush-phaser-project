/**
 * @class mainGame
 * A Phaser scene
 */
var game = require('../game');

module.exports = {

  create: function () {
    game.analytics.trackEvent('scene', 'create', 'mainGame');

    game.stage.backgroundColor = '#fff';
  },

  update: function () {
    // add your game loop code here
  },

  restartGame: function () {
    game.analytics.trackEvent('scene', 'create', 'restartGame');

    game.state.start('menu');
  }

};
