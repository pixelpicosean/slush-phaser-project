import RotateLogo from 'prefabs/rotate-logo';

var logo;
class Game {

    create() {
        logo = new RotateLogo(
            this.game,
            this.game.width / 2, this.game.height / 2,
            0.5
        );

        this.add.existing(logo);
    }

}

export default Game;
