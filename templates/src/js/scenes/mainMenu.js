/*globals module, require, localStorage*/

var Phaser = require('phaser'),
  game = require('../game'),
  localisation = require('../locale');

module.exports = {

  create: function () {

    var tween,
      highscore = localStorage.getItem("highscore"),
      lastscore = localStorage.getItem("lastscore"),
      style = {
        font: '30px Arial',
        fill: '#fff'
      };

    if (highscore) {
      this.highscore = highscore;
    } else {
      this.highscore = 0;
    }

    this.background = this.add.sprite(0, 0, 'menu_background');
    this.background.alpha = 0;

    this.labelTitle = game.add.text(20, 20, localisation[game.language].mainMenu.labelTitle, style);
    this.labelTitle.alpha = 0;

    this.highscoreLabel = game.add.text(20, 280, localisation[game.language].mainMenu.highScore + ": " + this.highscore, style);

    if (lastscore) {
      this.lastscoreLabel = game.add.text(20, 240, localisation[game.language].mainMenu.lastScore + ": " + lastscore, style);
    }

    tween = this.add.tween(this.background)
      .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    this.add.tween(this.labelTitle)
      .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    game.state.start('level1', true, false);
  }

};
