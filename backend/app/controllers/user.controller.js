const {hashPassword} = require("../helpers/bcrypt.helper");
const {insertUser, getUserById} = require("../models/user/User.model");

// Create new user
exports.create = async (req, res) => {
    try {
        // Hash password
        const password = await hashPassword(req.body.password)

        const result = await insertUser({...req.body, password})
        res.status(201).json({status: 'success', message: 'New user created successfully', result})
    } catch (error) {
        console.log('Create new user controller => ', error)
        res.status(400).json({status: 'error', message: error.message})
    }
}

// Login
exports.login = async (req, res) => {
    
}

// Request reset password
exports.requestResetPassword = async (req, res) => {
    
}

// Reset password
exports.resetPassword = async (req, res) => {
    
}

// Logout
exports.logout = async (req, res) => {
    
}

// Get user profile
exports.profile = async (req, res) => {
    const _id = req.userId

    const userProfile = await getUserById(_id)
    const {name, email} = userProfile

    res.status(200).json({status: 'success', user: {_id, name, email}})
}
