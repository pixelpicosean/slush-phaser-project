function Game() {}

Game.prototype.preload = function () {
  game.analytics.trackEvent('scene', 'preload', 'game');
  game.stage.backgroundColor = '#000';
};

Game.prototype.create = function () {
  game.analytics.trackEvent('scene', 'create', 'game');
};

export default Game;
