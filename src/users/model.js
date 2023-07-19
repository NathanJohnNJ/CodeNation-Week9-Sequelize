const { DataTypes } = require("sequelize");

const connection = require("../db/connection");

const User = connection.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    }},
    {indexes: [{unique: true, fields:["username", "email"]}]}
)

module.exports = User;