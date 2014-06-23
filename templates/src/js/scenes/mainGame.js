var game = require('../game'),
  localisation = require('../locale');

module.exports = {

  create: function () {

    var style = {
      font: '30px Arial',
      fill: '#4488cc',
      align: 'center'
    };

    game.stage.backgroundColor = '#fff';

    this.labelTitle = game.add.text(game.width * 0.5, game.height * 0.5, localisation[game.language].mainGame.labelTitle, style);

  },

  update: function () {
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};
