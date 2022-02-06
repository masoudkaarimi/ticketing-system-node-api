require('dotenv')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {getLogger} = require("nodemailer/lib/shared");

const PORT = process.env.PORT || 9000

const app = express()

// API security
app.use(helmet())

// Handle CORS Error
app.use(cors())

// MongoDB connection setup


// Logger
app.use(morgan('tiny'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes

// Error handler


app.listen(PORT, () => console.log(`API is Ready on http://localhost:${PORT}`))