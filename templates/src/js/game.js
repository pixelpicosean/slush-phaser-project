/**
 * @class game
 * This is used to store a reference to the Phaser game object
 *
 * @author Matt Gale <matt@littleball.co.uk>
 **/
var Phaser = require('phaser');

var game = new Phaser.Game(<%= width %>, <%= height %>, Phaser.AUTO, 'content', null);

module.exports = game;
