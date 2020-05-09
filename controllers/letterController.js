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

const viewRecentLetter = async function (userid) {
    const result = await letters.findOne({
        where: {
            UserId: {
                [Op.ne]: userid
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });
    return result;
}

const viewNextLetter = async function (userid, letterid) {
    // trying to find NEXT (letterid will be different) letter for a DIFFERENT user, 
    const result = await letters.findOne({
        where: {
            UserId: {
                [Op.ne]: userid
            },
            id: {
                [Op.lt]: letterid
            }
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });

    if (result == null) {
        // didn't find a letter. That could mean two things.
        // 1: there are truly no results to show for the logged in person.
        // 2: we reached the very beginning of letters, and we need to loop back around to most recent one
        if (letterid == Number.MAX_SAFE_INTEGER) {
            // if we reached here, that means letterid is set to maximum number allowed.
            // that means we were already in this function before, and we had set that letterid
            // we are already in the if result is null check, and letterid is still maximum number
            // therefore that means there are truly no records to show for that user.
            return null;
        }
        // we will try to set the letterid to maximum number allowed.
        letterid = Number.MAX_SAFE_INTEGER;
        // we will try to call the same function, but this time with a very large id number.
        return viewNextLetter(userid, letterid);
    }

    // we will only get here if the result is not null.
    // because if the result is null, the code above it will return different value.
    // that means we found a good record to show.
    return result;
}

module.exports = {
    createLetter,
    viewLetters,
    viewRecentLetter,
    viewNextLetter
};