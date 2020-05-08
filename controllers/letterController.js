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

const viewLetters = async function (userid) {
    const results = await letters.findAll({
        where: {
            UserId: {
                [Op.ne]: userid
            }
        }
    });
    return results;
}

module.exports = {
    createLetter,
    viewLetters
};