function Preloader() {}

Preloader.prototype.preload = function () {
  game.analytics.trackEvent('scene', 'preload', 'preloader');
  game.stage.backgroundColor = '#4488cc';
};

Preloader.prototype.create = function () {
  game.analytics.trackEvent('scene', 'create', 'preloader');
};

export default Preloader;
