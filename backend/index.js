require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 9000
const Routes = require('./app/routes')
const errorHandler = require('./app/utils/errorHandler')

const app = express()

// API security
app.use(helmet())

// Handle CORS Error
app.use(cors())

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
    .then((result) => console.log('MongoDB connected!'))
    .catch((error) => console.log(error))

// Logger
app.use(morgan('tiny'))

// setup request body and json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes
app.use('/api', Routes)

// Error handler
app.use((req, res, next) => {
    const error = new Error('Resources not found!')
    error.status = 404
    next(error)
})

app.use('*', (error, req, res, next) => {
    errorHandler(error, res)
})


app.listen(PORT, () => console.log(`API is Ready on http://localhost:${PORT}`))
