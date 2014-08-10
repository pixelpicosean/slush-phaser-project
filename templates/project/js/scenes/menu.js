function Menu() {}

var logo;

Menu.prototype.create = function() {
    logo = this.add.sprite(
        'logo',
        this.game.width / 2, this.game.height / 2
    );
    logo.anchor.setTo(0.5);
};

export default Menu;
