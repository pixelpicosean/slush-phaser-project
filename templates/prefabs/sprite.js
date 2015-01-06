class <%= name %> extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, '<%= key %>');

        /* init code here */
        this.anchor.setTo(0.5);
    }

    update() {
        // TODO
    }

}

export default <%= name %>;
