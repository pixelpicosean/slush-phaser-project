/* globals module, require, localStorage*/

var Phaser = require('phaser/phaser');

module.exports = {

  create: function () {

    this.background = this.add.sprite(0, 0, 'menu_background');

    this.player = this.add.sprite(50, 50, 'game_sprites');
    this.player.body.gravity.y = 1000;

    this.blocks = this.game.add.group();
    this.blocks.createMultiple(20, 'game_sprites', 1);

    this.input.onDown.add(this.jump, this);

    this.blockTimer = this.game.time.events.loop(500, this.addBlock, this);
    this.scoreTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.addScore, this);

    this.score = 0;
    var style = {
      font: '30px Arial',
      fill: '#fff'
    };
    this.labelScore = this.game.add.text(20, 20, "0", style);
  },

  update: function () {
    if (this.player.inWorld === false) {
      this.restartGame();
    }
    this.game.physics.overlap(this.player, this.blocks, this.restartGame, null, this);
  },

  jump: function () {
    this.player.body.velocity.y = -350;
  },

  addBlock: function () {
    var x = 480,
      y = ((Math.floor(Math.random() * 5) + 1) * 60) - 30;

    var block = this.blocks.getFirstDead();
    block.reset(x, y);
    block.body.velocity.x = -200;
    block.outOfBoundsKill = true;
  },

  addScore: function () {
    this.score += 1;
    this.labelScore.content = this.score;
  },

  restartGame: function () {
    
    var previousHighscore = localStorage.getItem("highscore");
    if (!previousHighscore || previousHighscore < this.score) {
      localStorage.setItem("highscore", this.score);
    }

    this.game.time.events.remove(this.blockTimer);
    this.game.time.events.remove(this.scoreTimer);
    this.game.state.start('mainMenu');
  }

};
