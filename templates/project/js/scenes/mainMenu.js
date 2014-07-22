/**
 * @class mainMenu
 * A Phaser scene
 */
var Phaser = require('phaser'),
  game = require('../game'),
  localisation = require('../locale'),
  Label = require('../classes/label');

module.exports = {

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'mainMenu');

    var tween,
      style = {
        font: '30px Arial',
        fill: '#ffffff',
        align: 'center'
      };

    // set the background colour
    game.stage.backgroundColor = '#4488cc';
    
    // add a label based on our custom class
    this.labelTitle = new Label(game.width * 0.5, game.height * 0.5, localisation[game.language].mainMenu.labelTitle, style);
    this.labelTitle.alpha = 0;
    game.add.existing(this.labelTitle);

    // fade the label in
    tween = this.add.tween(this.labelTitle);
    tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    
    // add an input listener
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    
    // go to the main game scene
    game.state.start('mainGame', true, false);
  }

};
