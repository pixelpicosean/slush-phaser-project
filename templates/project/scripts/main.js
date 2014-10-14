<% if (useClassSystem) { %>import 'utils/class';
<% } %>
import Analytics from 'utils/analytics';

import Boot from 'scenes/boot';
import Preload from 'scenes/preload';
import Menu from 'scenes/menu';
import Game from 'scenes/game';

var game, App = {};

App.start = function() {
    game = new Phaser.Game(
        <%= width %>, <%= height %>,
        Phaser.AUTO,
        '<%= packageName %>'
    );

    game.analytics = new Analytics('<%= packageName %>');

    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('menu', Menu);
    game.state.add('game', Game);

    game.state.start('boot');

    return game;
};

export default App;
