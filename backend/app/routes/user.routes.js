const router = require('express').Router()

// Require controller modules
const {userController} = require("../controllers/UserController");

// All
router.all('/', async (req, res, next) => {
    // res.status(200).json({status: 'success', message: 'Return from user router'})
    next()
})

// Create new user
router.post('/create', userController.create)

// user sign in
// user sign out
// user request reset password
// user reset password

// user profile
router.get('/profile', userController.profile)

module.exports = router
