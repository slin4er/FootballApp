const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const playerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        default: 18
    },
    sex: {
        type: String,
        default: 'male'
    },
    leg: {
        type: String,
        default: 'right'
    },
    position: {
        type: String,
        default: 'FW'
    },
    goals: {
        type: Number,
        default: 0
    },
    saves: {
        type: Number,
        default: 0
    },
    yellowCards: {
        type: Number,
        default: 0
    },
    redCards: {
        type: Number,
        default: 0
    },
    photo: {
        type: Buffer
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        select: false
    },
    phone: {
        type: String,
        required: true,
        select: false
    },
    team: {
        type: Schema.Types.ObjectId,
        ref:'team'
    },
    token: {
        type: String,
        select:false
    }
})

playerSchema.method('signToken', async (player) => {
    const token = await jwt.sign(
        {player_id: player._id},
        process.env.TOKEN_KEY,
        {expiresIn: '24h'}
    )
    return token
})

const Player = mongoose.model('player', playerSchema)

module.exports = Player