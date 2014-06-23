var game = require('../game');

module.exports = {

  create: function () {

  },

  update: function () {
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};
