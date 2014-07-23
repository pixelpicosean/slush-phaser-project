function Menu() {}

Menu.prototype.preload = function () {
  this.game.analytics.trackEvent('scene', 'preload', 'menu');
};

Menu.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'menu');
};

export default Menu;
