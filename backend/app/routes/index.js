const app = require('express')()

// Load routers
const userRoutes = require('./user.routes')
const ticketRoutes = require('./ticket.routes')
const tokenRoutes = require('./token.routes')

// Use routes
app.use('/user', userRoutes)
app.use('/ticket', ticketRoutes)
app.use('/token', tokenRoutes)


module.exports = app