const {verifyAccessJWT} = require('../helpers/jwt.helper')
const {getJWT, deleteJWT} = require('../helpers/redis.helper')

// Check user authorization
exports.userAuthorization = async (req, res, next) => {
    const {authorization} = req.headers

    // Check if the authorization key is valid or not
    const decode = await verifyAccessJWT(authorization)

    // Check if there is an email
    if (decode.email) {
        // Getting user id from Redis
        const userId = await getJWT(authorization)

        // Is there a user id or not
        if (!userId) {
            return res.status(403).json({status: 'error', message: 'Forbidden'})
        }

        // Set userId in req
        req.userId = userId

        return next()
    }

    // Delete authorization key on Redis
    deleteJWT(authorization)

    return res.status(403).json({status: 'error', message: 'Forbidden'})
}

