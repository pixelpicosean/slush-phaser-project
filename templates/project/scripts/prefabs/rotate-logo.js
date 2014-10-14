class RotateLogo extends Phaser.Sprite {

    constructor(game, x, y, rotateSpeed) {
        super(game, x, y, 'logo');
        this.anchor.setTo(0.5);

        this.rotateSpeed = rotateSpeed;
    }

    update() {
        this.angle += this.rotateSpeed;
    }

}

export default RotateLogo;
