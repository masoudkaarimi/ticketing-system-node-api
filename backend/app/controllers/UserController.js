const {hashPassword} = require("../helpers/bcrypt.helper");
const {insertUser} = require("../models/user/User.model");

const create = async (req, res) => {
    try {
        // Hash password
        const password = await hashPassword(req.body.password)

        const result = await insertUser({...req.body, password})
        console.log(result)
        res.status(201).json({status: 'success', message: 'New user created successfully', result})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
}

const profile = async (req, res) => {
    const _id = req.userId
    const userProfile = await getUserById(_id)
}

module.exports.userController = {
    create,
    profile
}