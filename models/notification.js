const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Join Team', 'Plain Text'],
        required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'player'
    },
    team: {
        type: Schema.Types.ObjectId || String,
    },
    text: {
        type: String
    }
})

const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification