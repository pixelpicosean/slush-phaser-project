var Phaser = require('phaser'),
  game = require('../game');

var Label = function (x, y, textContent, fontStyle) {

  // set a basic style
  var style = fontStyle || {
    font: '30px Arial',
    fill: '#4488cc',
    align: 'center'
  };

  // call the superclass method
  Phaser.Text.call(this, game, x, y, textContent, style);
  this.anchor.setTo(0.5, 0.5);

};

Label.prototype = Object.create(Phaser.Text.prototype);
Label.prototype.contructor = Label;

module.exports = Label;
