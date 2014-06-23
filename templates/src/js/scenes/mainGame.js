var game = require('../game'),
  localisation = require('../locale');

module.exports = {

  create: function () {

    var style = {
      font: '30px Arial',
      fill: '#4488cc'
    };

    game.stage.backgroundColor = '#fff';

    this.labelTitle = game.add.text(20, 20, localisation[game.language].mainGame.labelTitle, style);

  },

  update: function () {
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};
