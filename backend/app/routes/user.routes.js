const router = require('express').Router()

// Require controller modules
const {userController} = require("../controllers/user.controller");

const {userAuthorization} = require("../middlewares/authorization.middleware");

// All
router.all('/', async (req, res, next) => {
    // res.status(200).json({status: 'success', message: 'Return from user router'})
    next()
})

// POST - Create new user
router.post('/create', userController.create)

// POST - Login
router.post('/login', userController.login)

// POST - Request reset password
router.post('/request-reset-password', userAuthorization, userController.requestResetPassword)

// PATCH - Reset password
router.patch('/reset-password', userAuthorization, userController.resetPassword)

// DELETE - Logout
router.post('/logout', userAuthorization, userController.logout)

// GET - Get user profile
router.get('/profile', userAuthorization, userController.profile)

module.exports = router
