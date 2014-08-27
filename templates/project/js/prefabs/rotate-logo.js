function RotateLogo(game, x, y, rotateSpeed) {
    Phaser.Sprite.call(this, game, x, y, 'logo');
    this.anchor.setTo(0.5);

    this.rotateSpeed = rotateSpeed;
}

RotateLogo.prototype = Object.create(Phaser.Sprite.prototype);
RotateLogo.prototype.constructor = RotateLogo;

RotateLogo.prototype.update = function() {
    this.angle += this.rotateSpeed;
};

export default RotateLogo;
