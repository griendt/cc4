const {DataTypes, Model} = require('sequelize');
const sequelize = require("../database")

class Game extends Model {
}

class User extends Model {
}

class GameUser extends Model {
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'Game',
});

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    deleted_at: DataTypes.DATE,
    identifier: {
        type: DataTypes.STRING,
        unique: true,
    },
}, {
    underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        sequelize,
        modelName: 'User',
});

GameUser.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    deleted_at: DataTypes.DATE,
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'GameUser'
});

Game.belongsToMany(User, {
    through: GameUser,
    foreignKey: 'game_id',
});
User.belongsToMany(Game, {
    through: GameUser,
    foreignKey: 'user_id',
});

// test
// User.findOne({include: Game}).then(async (user) => {
//     console.log(user);
//     console.log(await user.getGames());
// });

module.exports = {Game, GameUser, User};
