function Menu() {}

Menu.prototype.preload = function () {
  game.analytics.trackEvent('scene', 'preload', 'menu');
  game.stage.backgroundColor = '#4488cc';
};

Menu.prototype.create = function () {
  game.analytics.trackEvent('scene', 'create', 'menu');
};

export default Menu;
