function Boot() {}

Boot.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'boot');
};

Boot.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'boot');

  // max number of fingers to detect
  this.input.maxPointers = 1;

  // auto pause if window looses focus
  this.stage.disableVisibilityChange = true;

  if (this.game.device.desktop) {
    this.stage.scale.pageAlignHorizontally = true;
  }

  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.setScreenSize();

  this.game.state.start('preloader', true, false);
};

export default Boot;
