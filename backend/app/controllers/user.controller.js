const {hashPassword, comparePassword} = require("../helpers/bcrypt.helper");
const {insertUser, getUserById, getUserByEmail, storeUserRefreshJWT, updatePassword} = require("../models/user/User.model");
const {createAccessJWT, createRefreshJWT} = require("../helpers/jwt.helper");
const {deleteJWT} = require("../helpers/redis.helper");
const {mailer} = require("../helpers/email.helper");
const {setResetPasswordPin, deletePin, checkIsValidPinAndEmail} = require("../models/pin/Pin.model");

// Create new user
const createUser = async (req, res) => {
    try {
        // Hash password
        const password = await hashPassword(req.body.password)

        // Insert user on mongoDB
        const result = await insertUser({...req.body, password})

        res.status(201).json({status: 'success', message: 'New user created successfully', result})
    } catch (error) {
        console.log('Create new user controller => ', error)
        res.status(400).json({status: 'error', message: error.message})
    }
}

// Login
const login = async (req, res) => {
    const {email, password} = req.body

    // Check receive the email
    if (!email)
        return res.status(400).json({status: 'error', message: 'Email is requiered'})

    // check receive the password
    if (!password)
        return res.status(400).json({status: 'error', message: 'Password is requiered'})

    // Get user by email from database
    const user = await getUserByEmail(email)

    // Hash our password and compare with the database one
    const mainPassword = user && user._id ? user.password : null
    if (!mainPassword)
        return res.status(400).json({status: 'error', message: 'Email not exist'})

    const result = await comparePassword(password, mainPassword)
    if (!result)
        return res.status(400).json({status: 'error', message: 'Incorrect password'})

    // Create accessJWT and refreshJWT
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

    res.status(200).json({status: 'success', message: 'Login successfully', accessJWT, refreshJWT})
}

// Request reset password
const requestResetPassword = async (req, res) => {
    const {email} = req.body

    // Get user by email from database
    const user = await getUserByEmail(email)

    // Check email exists on the database
    if (user && user._id) {
        // Store pin on database
        const setPin = await setResetPasswordPin(email)

        // Send pin to email
        await mailer({email, pin: setPin.pin, type: 'request-reset-password'})

        console.log(`Pin for ${email} ${setPin.pin}`)

        return res.json({
            status: 'success',
            message: `Pin code sent to ${email} successfully`
        })
    }

    res.json({
        status: 'error',
        message: `Email not exists`
    })
}

// Reset password
const resetPassword = async (req, res) => {
    const {email, pin, newPassword} = req.body

    // Check is valid pin and email
    const getPin = await checkIsValidPinAndEmail(pin, email)

    // Check exists pin code on database
    if (getPin && getPin._id) {
        const dbDate = getPin.createdAt
        const expiresIn = 300 // 5 minutes
        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn)
        const today = new Date()

        if (today > expDate) {
            return res.json({status: 'error', message: "Pin code expired"})
        }

        // Hash password
        const hashPass = await hashPassword(newPassword)

        // Update password on database
        const user = await updatePassword(email, hashPass)

        // Check exist user on database
        if (user._id) {
            // Send message password successfully updated to email
            await mailer({email, type: 'update-reset-password'})

            // Delete pin code on database
            deletePin(email, pin)

            return res.json({status: 'success', message: "Your password has been updated"})
        }
    }

    res.json({status: 'error', message: "Unable to update the password"})
}

// Logout
const logout = async (req, res) => {
    const {authorization} = req.headers
    const _id = req.userId

    // Delete access JWT token on Rdis
    deleteJWT(authorization)

    // Empty refresh JWT token on mongoDB
    const result = await storeUserRefreshJWT(_id, '')
    if (result && result._id)
        return res.status(200).json({status: 'success', message: 'Logout successfully'})

    res.status(400).json({status: 'error', message: 'Unable to logout'})
}

// Get user profile
const profile = async (req, res) => {
    const _id = req.userId

    // Get user by id from database
    const {name, email} = await getUserById(_id)

    res.status(200).json({status: 'success', user: {_id, name, email}})
}

module.exports.userController = {
    createUser,
    login,
    requestResetPassword,
    resetPassword,
    logout,
    profile,
}