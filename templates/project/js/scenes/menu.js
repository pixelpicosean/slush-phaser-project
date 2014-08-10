function Menu() {}

var logo;

Menu.prototype.create = function() {
    logo = this.add.sprite(
        this.game.width / 2, this.game.height / 2,
        'logo'
    );
    logo.anchor.setTo(0.5);
};

export default Menu;
