const express = require('express')
const {verifyRefreshJWT, createAccessJWT} = require("../helpers/jwt.helper");
const {getUserByEmail} = require("../models/user/User.model");
const {tokenController} = require("../controllers/token.controller");
const router = express.Router()

// GET - Refresh access JWT
router.get('/', tokenController.refreshAccessJWT)

module.exports = router