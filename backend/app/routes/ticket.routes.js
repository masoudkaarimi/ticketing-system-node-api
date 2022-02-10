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
router.get('/tickets', userAuthorization, ticketController.getTicketsByUserId)

// GET - Get tickets ticket id
router.get('/tickets:/_id', userAuthorization, ticketController.getTicketsByTicketId)

// PUT - Update reply message from client
router.put('/:_id', validation.replyTicketMessage, userAuthorization, ticketController.updateReplyMessage)

// PATCH - Update ticket status to close
router.patch('/close-ticket/:_id', userAuthorization, ticketController.updateTicketClose)

// DELETE - Delete a ticket
router.delete('/ticket:_id', userAuthorization, ticketController.deleteTicket)

module.exports = router
