const { Model, DataTypes } = require('sequelize');
var sequelize = require('../config/connection.js');
const User = require('./user.js');
const Letter = require('./letter.js');

class Response extends Model {}

Response.init(
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

Response.belongsTo(User);

module.exports = Response;