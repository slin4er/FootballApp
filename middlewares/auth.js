const jwt = require('jsonwebtoken')
require('dotenv').config()
const Player = require('../models/player')

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1]: false
    if(!token) {throw new Error('Unauthorized, token is required!')}
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY)
        const player = await Player.findOne({_id: decoded.player_id, token})
        if(!player) {throw new Error('Unauthorized, token is required!')}
        req.player = player
        req.token = token
        return next()
    } catch (err) {
        res.status(401).send('Unauthorized!')
    }
}

module.exports = verifyToken