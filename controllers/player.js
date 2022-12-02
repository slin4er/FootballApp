const Player = require('../models/player')
const bcrypt = require('bcrypt')
require('dotenv').config()

const getAllPlayers = async (req, res) => {
    const players = await Player.find()
    if(!players.length) throw new Error('Have not been added yet')
    res.status(200).json(players)
}

const getPlayer = async (req, res) => {
    const {id: playerID} = req.params
    const player = await Player.findById(playerID).populate('team').exec()
    if(!player) {throw new Error('Not Found')}
    res.status(200).json({player})
}

const createPlayer = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {throw new Error('Email and password must be provided')}
    const oldPlayer = await Player.find({email})
    if(oldPlayer.length > 0) {throw new Error('This email was already taken')}
    const hashedPassword = await bcrypt.hash(password, 10)
    const player = await Player.create({...req.body, password: hashedPassword})
    const token = await player.signToken(player)
    player.token = token
    await player.save()
    res.status(201).json({player})
}

const loginPlayer = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {throw new Error('Email and password must be provided')}
    const player = await Player.findOne({email})
    if(!player) {throw new Error('Not Found')}
    if(!await bcrypt.compare(password, player.password)) {throw new Error('Something went wrong, try again!')}
    const token = await player.signToken(player)
    player.token = token
    await player.save()
    res.status(201).json({player})
}

const updatePlayer = async (req, res) => {
    const {id: playerID} = req.params
    const player = await Player.findByIdAndUpdate(playerID, req.body, {new: true})
    if(!player) throw new Error('Not Found')
    res.status(201).json({player})
}

const playerLogout = async (req, res) => {
    if(!req.player) {throw new Error('Something went wrong, try again!')}
    req.player.token = undefined
    await req.player.save()
    res.status(200).json('You have logged out!')
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
    loginPlayer,
    updatePlayer,
    deletePLayer,
    playerLogout
}