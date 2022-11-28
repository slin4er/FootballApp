const Player = require('../models/player')

const getAllPlayers = async (req, res) => {
    const players = await Player.find()
    if(!players.length) throw new Error('Players have not been added yet')
    res.status(200).json(players)
}

const getPlayer = async (req, res) => {
    const {id: playerID} = req.params
    const player = await Player.findById(playerID)
    if(!player) {throw new Error('Not Found')}
    res.status(200).json({player})
}

const createPlayer = async (req, res) => {
    const player = await Player.create(req.body)
    res.status(201).json({player})
}

const updatePlayer = async (req, res) => {
    const {id: playerID} = req.params
    const player = await Player.findByIdAndUpdate(playerID, req.body, {new: true})
    if(!player) throw new Error('Not Found')
    res.status(201).json({player})
}

const deletePLayer = async (req, res) => {
    const {id: playerID} = req.params
    const player = await Player.findByIdAndDelete(playerID)
    if(!player) throw new Error('Not Found')
    res.status(200).json({msg: "Player was successfully deleted!"})
}

module.exports = {
    getAllPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePLayer
}