function Game() {}

Game.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'game');
};

Game.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'game');
};

export default Game;
