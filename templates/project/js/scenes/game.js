function Game() {}

Game.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'game');
};

export default Game;
