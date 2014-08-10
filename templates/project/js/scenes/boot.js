function Boot() {}

Boot.prototype.preload = function() {
    this.load.image('preloader', 'assets/preloader.gif');
};

Boot.prototype.create = function() {
    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
        this.stage.scale.pageAlignHorizontally = true;
    }

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setScreenSize();

    this.game.state.start('preloader', true, false);
};

export default Boot;
