const errorHandler = (error, res) => {
    console.log('Error Handler => ', error)
    res.status(error.status || 500)
    res.json({status: 'error', message: error.message})
}

module.exports = errorHandler