/*globals module, require*/

var Phaser = require('phaser');

module.exports = {

  preload: function () {

    this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.x = 0.5;
    this.loadingBar.anchor.y = 0.5;
    this.load.setPreloadSprite(this.loadingBar);

    this.game.load.image('menu_background', 'assets/menu_background.png');
    this.game.load.spritesheet('game_sprites', 'assets/game_sprites.png', 32, 32);

  },

  create: function () {
    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    this.game.state.start('mainMenu', true, false);
  }

};
