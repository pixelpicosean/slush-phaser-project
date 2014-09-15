var logo;
class Menu {

    create() {
        logo = this.add.sprite(
            this.game.width / 2, this.game.height / 2,
            'logo'
        );
        logo.anchor.setTo(0.5);

        this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('game');
    }

}

export default Menu;
