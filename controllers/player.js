const Player = require('../models/player')

const getPlayer = async (req, res) => {
    try {
        const {id: playerID} = req.params
        const player = await Player.findById(playerID)
        if(!player) {throw new Error('Not Found')}
        res.status(200).json({player})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body)
        res.status(201).json({player})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    getPlayer,
    createPlayer
}