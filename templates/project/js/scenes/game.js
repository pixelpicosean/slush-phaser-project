import RotateLogo from 'prefabs/rotate-logo';

function Game() {}

var logo;
Game.prototype.create = function() {
    logo = new RotateLogo(
        this.game,
        this.game.width / 2, this.game.height / 2,
        0.5
    );

    this.add.existing(logo);
};

export default Game;
