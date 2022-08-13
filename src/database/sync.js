const models = require('./models');

(async function () {
    await models.Game.sync();
})();
