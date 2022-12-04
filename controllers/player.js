const Player = require('../models/player')
const Team = require('../models/team')
const Notification = require('../models/notification')
const bcrypt = require('bcrypt')
require('dotenv').config()

//SIGN IN , LOG IN AND LOG OUT ROUTES

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
    res.status(201).json({player, token})
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
    res.status(200).send({player, token})
}

const playerLogout = async (req, res) => {
    if(!req.player) {throw new Error('Something went wrong, try again!')}
    req.player.token = undefined
    await req.player.save()
    res.status(200).json('You have logged out!')
}

//GET ROUTES

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

const getProfile = async (req, res) => {
    const {id: player_id} = req.params
    const player = await Player.findById(player_id).populate('notifications').exec()
    if(!player) {throw new Error('Not Found')}
    res.status(200).json({player, notifications: player.notifications})
}

//INVITATION'S ROUTES

const sendInvitationToPlayer = async (req, res) => {
    const {id: player_id} = req.params
    const notification = await Notification.create({
        title: 'Invite to team',
        type: 'Join Team'
    })
    const playerToInvite = await Player.findById(player_id)
    if(!playerToInvite) {throw new Error('Not Found')}
    playerToInvite.notifications = playerToInvite.notifications.concat(notification._id)
    await playerToInvite.save()
    res.status(200).send('Your invitation was sent successfully!')
}

// PLAYER'S ROUTES

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
    getProfile,
    createPlayer,
    loginPlayer,
    updatePlayer,
    sendInvitationToPlayer,
    deletePLayer,
    playerLogout
}