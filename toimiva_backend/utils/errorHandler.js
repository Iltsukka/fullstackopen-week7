const { response } = require("../app")


const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
    }
    else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({error: 'token missing or it is invalid'})
    }
    next(error)
}

module.exports = errorHandler