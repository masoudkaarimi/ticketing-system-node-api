const Joi = require('joi')
const {isSchema} = require("joi");

// Custom message
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

// Definition of rules
const email = Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
const pin = Joi.number().min(10000).max(999999).required()
const phone = Joi.number().min(400000001).max(500000001).required()
const newPassword = Joi.string().min(3).max(30).required()
const date = Joi.date()
const shortString = Joi.string().min(2).max(50)
const longString = Joi.string().min(2).max(1000)

// Handle reset pin validation
const resetPin = (req, res, next) => {
    const schema = Joi.object({email})
    const value = schema.validate(req.body)

    // Check if there errors
    if (value.error) {
        return res.status(400).json({status: 'error', message: value.error.message})
    }

    next()
}

// Handle update password request validation
const updatePasswordRequest = (req, res, next) => {
    const shema = Joi.object({email, pin, newPassword})
    const value = shema.validate(req.body)

    // Check if there errors
    if (value.error) {
        return res.status(400).json({status: 'error', message: value.error.message})
    }

    next()
}

// Handle create new ticket validation
const createNewTicket = (req, res, next) => {
    const schema = Joi.object({
        subject: shortString.required(),
        sender: shortString.required(),
        message: longString.required(),
    })

    const value = schema.validate(req.body)

    // Check if there errors
    if (value.error) {
        return res.status(400).json({status: 'error', message: value.error.message})
    }

    next()
}

// Handle reply ticket message validation
const replyTicketMessage = (req, res, next) => {
    const schema = Joi.object({
        sender: shortString.required(),
        message: shortString.required()
    })

    const value = schema.validate(req.body)

    // Check if there errors
    if (value.error) {
        return res.status(400).json({status: 'error', message: value.error.message})
    }

    next()
}


module.exports.validation = {
    resetPin,
    updatePasswordRequest,
    createNewTicket,
    replyTicketMessage
};
