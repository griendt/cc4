const {DataTypes, Model} = require('sequelize');
const sequelize = require("../../database")

class Game extends Model {
}

Game.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    deleted_at: DataTypes.TIME,
    display_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    started_at: DataTypes.DATE,
    ended_at: DataTypes.DATE,
    state: DataTypes.JSON,
}, {
    underscored: true,
    sequelize,
    modelName: 'Game',
});
//
// (async function ()
// {
//     await Game.sync();
// }());

module.exports = Game;