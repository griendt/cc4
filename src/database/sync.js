const models = require('./models');

(async function () {
    await models.Game.sync();
    await models.User.sync();
    await models.GameUser.sync();
})();
