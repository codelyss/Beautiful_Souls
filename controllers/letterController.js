const letters = require('../models/letter.js');
const User = require('../models/user.js');
const { Op } = require('sequelize');

const createLetter = async function (userid, data) {
    const result = await letters.create({
        message: data.message,
        UserId: userid
    });
    return result;
}

module.exports = {
    createLetter
};