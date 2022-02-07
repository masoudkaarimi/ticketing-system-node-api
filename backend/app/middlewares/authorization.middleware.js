const {verifyAccessJWT} = require('../helpers/jwt.helper')
const {getJWT, deleteJWT} = require('../helpers/redis.helper')

exports.userAuthorization = async (req, res, next) => {
    const {authorization} = req.headers

    const decode = await verifyAccessJWT(authorization)

    if (decode.email) {
        const userId = await getJWT(authorization)

        if (!userId) {
            return res.status(403).json({status: 'error', message: 'Forbidden'})
        }

        req.userId = userId

        return next()
    }

    deleteJWT(authorization)

    return res.status(403).json({status: 'error', message: 'Forbidden'})
}

