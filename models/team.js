const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const teamSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'The name of the team is required']
    },
    photo: {
        type: Buffer
    },
    wins: {
        type: Number,
        default: 0
    },
    looses: {
        type: Number,
        default: 0
    },
    trophies: [{
        type: String,
        default: 'None'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Team = mongoose.model('team', teamSchema)
module.exports = Team