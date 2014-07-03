/**
 * @class Label
 * An extention to the text class, that adds some default styling
 *
 * @extends Phaser.Text
 */
var Phaser = require('phaser'),
  game = require('../game');

/**
 * @constructor
 *
 * @param x {Number} Horizontal position
 * @param y {Number} Verticle position
 * @param textContext {String} The text to display
 * @param fontStyle {Object} Optional style of the text
 */
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
Label.prototype.constructor = Label;

module.exports = Label;
