function Preloader() {}

Preloader.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'preloader');
  this.game.stage.backgroundColor = '#4488cc';
};

Preloader.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'preloader');
};

export default Preloader;
