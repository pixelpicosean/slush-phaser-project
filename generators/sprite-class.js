export default Phaser.Sprite.extend({
    init: function(game, x, y) {
        this._super(game, x, y);

        /* init code here */
        this.anchor.setTo(0.5);
    }
});
