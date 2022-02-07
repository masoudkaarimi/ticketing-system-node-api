const jwt = require('jsonwebtoken')
const {setJWT} = require('./redis.helper')
const {storeUserRefreshJWT} = require('../models/user/User.model')

// Create Access JWT
exports.createAccessJWT = async (email, _id) => {
    try {
        const accessJWT = await jwt.sign(
            {email},
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: process.env.JWT_ACCESS_SECRET_EXP_DAY})

        await setJWT(accessJWT, _id)

        return Promise.resolve(accessJWT)
    } catch (error) {
        console.log('Create access JWT => ', error)
        return Promise.reject(error)
    }
}

// Create refresh JWT
exports.createRefreshJWT = async (email, _id) => {
    try {
        const refreshJWT = await jwt.sign(
            {email},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: process.env.JWT_REFRESH_SECRET_EXP_DAY})

        await storeUserRefreshJWT(_id, refreshJWT)

        return Promise.resolve(refreshJWT)
    } catch (error) {
        console.log('Create refresh JWT => ', error)
        return Promise.reject(error)
    }
}

// Verify access JWT
exports.verifyAccessJWT = async (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET))
    } catch (error) {
        console.log('Verify access JWT => ', error)
        return Promise.reject(error)
    }
}

// Verify refresh JWT
exports.verifyRefreshJWT = async (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET))
    } catch (error) {
        console.log('Verify refresh JWT => ', error)
        return Promise.reject(error)
    }
}