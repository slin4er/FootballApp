const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) {throw new Error('Unauthorized, token is required!')}
    try {
        const decoded = await jwt.decode(token, process.env.TOKEN_KEY)
        req.player = decoded
    } catch (err) {
        res.status(401).send('Unauthorized!')
    }
    return next()
}

module.exports = verifyToken