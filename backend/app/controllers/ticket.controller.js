const {insertTicket, getTicketById, updateClientReply, getTickets, updateStatusClose, deleteTicketById} = require("../models/ticket/Ticket.model");

// Create new ticket
const create = async (req, res) => {
    try {
        const {subject, sender, message} = req.body
        const userId = req.userId

        const ticketObj = {
            clientId: userId,
            subject,
            conversations: [
                {
                    sender,
                    message,
                }
            ]
        }

        // Insert new ticket on database
        const result = await insertTicket(ticketObj)

        if (result._id) {
            return res.status(201).json({status: 'success', message: 'New ticket has been created!'})
        }

        res.status(400).json({status: 'error', message: 'Unable to create the ticket'})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
}

// Get all tickets by user id
const getTicketsByUserId = async (req, res) => {
    try {
        const userId = req.userId

        // Get tickets by user id from database
        const result = await getTickets(userId)

        // Check exists tickets on database
        if (result)
            return res.status(200).json({status: 'success', tickets: result})

        res.status(400).json({status: 'error', message: 'Unable to get the tickets'})
    } catch (error) {
        res.json({status: 'error', message: error.message})
    }
}

// Get tickets by ticket id
const getTicketsByTicketId = async (req, res) => {
    try {
        const clientId = req.userId
        const {_id} = req.params

        // Get ticket by ticket id from database
        const result = await getTicketById(_id, clientId)

        // Check exists ticket on database
        if (result)
            return res.status(200).json({status: 'success', tickets: result})

        res.status(400).json({status: 'success', message: 'Unable to get the tickets'})

    } catch (error) {
        res.json({status: 'error', message: error.message})
    }
}

// Reply message
const ReplyMessage =  async (req, res) => {
    try {
        const {message, sender} = req.body
        // const clientId = req.userId
        const {_id} = req.params

        // Update client reply message on database
        const result = await updateClientReply({_id, message, sender})

        // Check is saved reply message on database
        if (result._id) {
            return res.status(200).json({status: 'success', message: 'Your message has been updated'})
        }

        res.status(400).json({status: 'error', message: "Unable to update your message"})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
}

// Close ticket
const closeTicket =  async (req, res) => {
    try {
        const {_id} = req.params
        const clientId = req.userId

        // Update ticket status to close on database
        const result = await updateStatusClose({_id, clientId})

        // Check exists ticket on database
        if (result._id) {
            return res.status(200).json({status: 'success', message: 'Ticket has been closed'})
        }

        res.status(400).json({status: 'error', message: "Unable to close the ticket"})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
}

// Delete ticket
const deleteTicket = async (req, res) => {
    try {
        const {_id} = req.params
        const clientId = req.userId

        // Delete ticket on database
        const result = await deleteTicketById({_id, clientId})

        // Check exist ticket on database
        if (result)
            return res.status(200).json({status: 'success', message: 'Ticket has been deleted'})

        res.status(400).json({status: 'success', message: 'Unable to delete the ticket'})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
}

module.exports.ticketController = {
    create,
    getTicketsByUserId,
    getTicketsByTicketId,
    ReplyMessage,
    closeTicket,
    deleteTicket,
}
