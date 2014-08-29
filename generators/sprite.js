function __NAMESPACE__(game, x, y/*, your-params-here */) {
    Phaser.Sprite.call(this, game, x, y, 'logo');

    /* init code here */
    this.anchor.setTo(0.5);
}

__NAMESPACE__.prototype = Object.create(Phaser.Sprite.prototype);
__NAMESPACE__.prototype.constructor = __NAMESPACE__;

__NAMESPACE__.prototype.update = function() {};

export default __NAMESPACE__;
