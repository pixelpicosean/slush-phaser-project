import Boot from 'scenes/boot';
import Preloader from 'scenes/preloader';
import Menu from 'scenes/menu';
import Game from 'scenes/game';

var game, App = {};

App.start = function() {
    game = new Phaser.Game(
        <%= width %>,
        <%= height %>,
        Phaser.AUTO,
        '<%= packageName %>'
    );

    game.analytics = new Analytics('<%= packageName %>');

    game.state.add('boot', Boot);
    game.state.add('preloader', Preloader);
    game.state.add('menu', Menu);
    game.state.add('game', Game);

    game.state.start('boot');

    return game;
};

export default App;
