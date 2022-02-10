const {verifyRefreshJWT, createAccessJWT} = require("../helpers/jwt.helper");
const {getUserByEmail} = require("../models/user/User.model");

// Refresh access JWT
const refreshAccessJWT = async (req, res) => {
    const {authorization} = req.headers

    // Check is verified refresh JWT
    const decode = await verifyRefreshJWT(authorization)

    // Check exists email on the token decode
    if (decode.email) {
        // Get user by email from database
        const userProfile = await getUserByEmail(decode.email)

        // Check email exists on the database
        if (userProfile._id) {
            let tokenExp = userProfile.refreshJWT.createdAt
            const dBRefreshToken = userProfile.refreshJWT.token

            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)

            const today = new Date()

            if (dBRefreshToken !== authorization && tokenExp < today) {
                return res.status(403).json({status: 'error', message: 'Forbidden'})
            }

            // Create new access JWT
            const accessJWT = await createAccessJWT(decode.email, userProfile._id.toString())

            return res.status(201).json({status: 'success', message: 'New access JWT created successfully', accessJWT})
        }
    }

    res.status(403).json({status: 'error', message: 'Forbidden'})
}

module.exports.tokenController = {refreshAccessJWT}
