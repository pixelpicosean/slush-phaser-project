function Game() {}

Game.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'game');
  this.game.stage.backgroundColor = '#000';
};

Game.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'game');
};

export default Game;
