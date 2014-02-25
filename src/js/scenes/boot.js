/*globals module*/

module.exports = {

  preload: function () {

    // the preloader images
    this.load.image('loadingBar', 'assets/preloader_loading.png');

  },

  create: function () {

    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }

    this.game.state.start('preloader', true, false);
  }

};
