const Team = require('../models/team')
const Player = require('../models/player')
const {Schema} = require("mongoose");
const mongoose = require('mongoose')

const createTeam = async (req, res) => {
    const team = await Team.create(req.body)
    if(!team) {throw new Error('Not Found')}
    res.status(201).json({team})
}

const findAllTeams = async (req, res) => {
    const teams = await Team.find({})
    if(!teams.length) {throw new Error('Have not been created yet')}
    res.status(200).json({teams})
}

const findOneTeam = async (req, res) => {
    const {id: teamID} = req.params
    const team = await Team.findById(teamID).populate('players').exec()
    if(!team) {throw new Error('Not Found')}
}

module.exports = {
    createTeam,
    findAllTeams,
    findOneTeam
}

