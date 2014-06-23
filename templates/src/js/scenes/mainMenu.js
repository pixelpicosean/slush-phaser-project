var Phaser = require('phaser'),
  game = require('../game'),
  localisation = require('../locale');

module.exports = {

  create: function () {

    var tween,
      style = {
        font: '30px Arial',
        fill: '#fff',
        align: 'center'
      };

    game.stage.backgroundColor = '#4488cc';

    this.labelTitle = game.add.text(game.width * 0.5, game.height * 0.5, localisation[game.language].mainMenu.labelTitle, style);
    this.labelTitle.anchor.setTo(0.5, 0.5);
    this.labelTitle.alpha = 0;

    tween = this.add.tween(this.labelTitle)
      .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    game.state.start('mainGame', true, false);
  }

};
