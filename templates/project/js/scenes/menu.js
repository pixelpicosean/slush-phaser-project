function Menu() {}

Menu.prototype.create = function () {
  this.game.analytics.trackEvent('scene', 'create', 'menu');
};

export default Menu;
