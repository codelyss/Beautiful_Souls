const users = require('../models/user.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const createUser = async function(data) {
    var salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(data.password, salt);
    const result = await users.create({
        username: data.username,
        password: encryptedPassword,
        active: true,
        reported_count: 0
    });
    return result;
}

module.exports = {createUser};