const {TicketSchema} = require('./Ticket.schema')

// Insert ticket
exports.insertTicket = (ticketObj) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema(ticketObj).save()
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Insert ticket => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Insert ticket => ', error)
            reject(error)
        }
    })
}

// Get tickets
exports.getTickets = (clientId) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.find({clientId})
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Get tickets => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Get tickets => ', error)
            reject(error)
        }
    })
}

// Get ticket by id
exports.getTicketById = (_id, clientId) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.find({_id, clientId})
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Get ticket by id => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Get ticket by id => ', error)
            reject(error)
        }
    })
}

// Update client reply
exports.updateClientReply = ({_id, message, sender}) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                {_id},
                {
                    status: 'pending',
                    $push: {
                        conversations: {message, sender}
                    }
                },
                {new: true})
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Update client reply => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Update client reply => ', error)
            reject(error)
        }
    })
}

// Update status close
exports.updateStatusClose = ({_id, clientId}) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                {_id, clientId},
                {status: 'closed'},
                {new: true})
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Update status close => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Update status close => ', error)
            reject(error)
        }
    })
}

// Delete ticket
exports.deleteTicketById = ({_id, clientId}) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndDelete({_id, clientId})
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Delete ticket => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Delete ticket => ', error)
            reject(error)
        }

    })
}
