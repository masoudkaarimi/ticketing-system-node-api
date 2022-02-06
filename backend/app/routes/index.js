const app = require('express')()

// Load routers
const userRoutes = require('./user.routes')
// const ticketRoutes = require('./ticket.routes')

// Use routes
app.use('/user', userRoutes)
// app.use('/ticket', ticketRoutes)


module.exports = app