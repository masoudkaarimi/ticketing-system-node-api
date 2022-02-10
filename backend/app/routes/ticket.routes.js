const router = require('express').Router()

const {
    insertTicket,
    getTickets,
    getTicketById,
    updateClientReply,
    updateStatusClose,
    deleteTicket
} = require("../models/ticket/Ticket.model")
const {userAuthorization} = require("../middlewares/authorization.middleware");
const {validation} = require("../middlewares/validation.middleware");
const {ticketController} = require("../controllers/ticket.controller");

// All
router.all('/', (req, res, next) => {
    // res.status(200).json({status: 'success', message: 'Return from ticket router'})
    next()
})

// POST - Create new ticket
router.post('/create', validation.createNewTicket, userAuthorization, ticketController.create)

// GET - Get all tickets by user id
router.get('/', userAuthorization, ticketController.getTicketsByUserId)

// GET - Get tickets by ticket id
router.get('/:_id', userAuthorization, ticketController.getTicketsByTicketId)

// PUT - Update reply message from client
router.put('/update/:_id', validation.replyTicketMessage, userAuthorization, ticketController.ReplyMessage)

// PATCH - Update ticket status to close
router.patch('/close/:_id', userAuthorization, ticketController.closeTicket)

// DELETE - Delete a ticket
router.delete('/delete/:_id', userAuthorization, ticketController.deleteTicket)

module.exports = router
