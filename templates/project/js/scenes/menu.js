function Menu() {}

Menu.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'menu');
  this.game.stage.backgroundColor = '#4488cc';
};

Menu.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'menu');
};

export default Menu;
