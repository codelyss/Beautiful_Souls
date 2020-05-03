const letters = require('../models/letter.js');
const { Op } = require('sequelize');

const createLetter = async function (userid, data) {
    const result = await letters.create({
        message: data.message
    }).then(newletter => {
        newletter.setUser(userid);
    });
    return result;
}

module.exports = {
    createLetter
};