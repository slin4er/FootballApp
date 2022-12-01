const mongoose = require('mongoose')
const {Schema} = require("mongoose");

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
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
    },
    token: {
        type: String
    }
})

const Player = mongoose.model('player', playerSchema)

module.exports = Player