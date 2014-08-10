function Preloader() {
    this.loadingSprite = null;
}

Preloader.prototype.preload = function () {
    this.loadingSprite = game.add.sprite(320, 480, 'preloader');
    this.loadingSprite.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.loadingSprite);

    // Load game assets here
};

Preloader.prototype.create = function () {
};

Preloader.prototype.onLoadComplete = function() {
    this.game.state.start('menu', true, false);
};

export default Preloader;
