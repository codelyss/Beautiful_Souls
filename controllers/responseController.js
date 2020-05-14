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

const viewRecentResponse = async function (userid, responseuserid, letterid) {
    const result = await responses.findOne({
        where: {
            [Op.or]: [
                {UserId: userid},
                {UserId: responseuserid}
            ],
            LetterId: letterid
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });
    return result;
}

const viewNextResponse = async function (letterid, responseid) {
     const result = await responses.findOne({
        where: {
            id: {
                [Op.lt]: responseid
            },
            LetterId: {
                [Op.eq]: letterid
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });

    if (result == null) {
        if (responseid == Number.MAX_SAFE_INTEGER) {
            return null;
        }
        responseid = Number.MAX_SAFE_INTEGER;
        return viewNextResponse(letterid, responseid);
    }

    return result;
}

const viewPreviousResponse = async function (letterid, responseid) {
    const result = await responses.findOne({
        where: {
            id: {
                [Op.gt]: responseid
            },
            LetterId: {
                [Op.eq]: letterid
            }
        },
        order: [
            ['createdAt', 'ASC']
        ]
    });

    if (result == null) {
        if (responseid == Number.MIN_SAFE_INTEGER) {
            return null;
        }
        responseid = Number.MIN_SAFE_INTEGER;
        return viewPreviousResponse(letterid, responseid);
    }

    return result;
}

module.exports = {
    createResponse,
    viewMyResponses,
    viewRecentResponse,
    viewNextResponse,
    viewPreviousResponse
};