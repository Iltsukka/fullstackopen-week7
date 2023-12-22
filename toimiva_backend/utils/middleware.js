const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
    let authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
       authorization = authorization.replace('Bearer ', '')
       
       request.token = authorization
    } else {
        request.token = null
    }

    next()
}
// const tokenFromRequest = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//       return authorization.replace('Bearer ', '')
  
//     }
//     return null
//   }

const userExtractor = (request, response, next) => {
    console.log(`request.token of userExtraction is ${request.token}`)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(400).json({error: 'invalid token'})
    }
    request.user = decodedToken.id
    next()
}

module.exports = {tokenExtractor, userExtractor}