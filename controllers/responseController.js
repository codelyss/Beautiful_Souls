const responses = require('../models/response.js');
const { Op } = require('sequelize');

const createResponse = async function (userid, data) {
    const result = await responses.create({
        message: data.message,
        LetterId: data.letterid,
        UserId: userid
    });
    return result;
}

const viewMyResponses = async function (userid) {
    const result = await responses.findAll({
        where: {
            UserId: {
                [Op.eq]: userid
            }
        }
    });
    return result;
}

module.exports = {
    createResponse,
    viewMyResponses
};