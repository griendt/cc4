const Game = require('./models/game');

(async function () {
    await Game.sync();
})();
