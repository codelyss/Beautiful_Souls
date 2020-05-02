const { Model, DataTypes } = require('sequelize');
var sequelize = require('../config/connection.js');
const User = require('./user.js');

class Letter extends Model { }

Letter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true
        }
    },
    {
        sequelize
    }
);

Letter.belongsTo(User);

module.exports = Letter;