const express = require('express')
require('express-async-errors')
require('dotenv').config()
const port = process.env.PORT
const app = express()
const players = require('./routes/player')
const teams = require('./routes/team')
const connectDB = require('./db/connect')
const wrongRoute = require('./middlewares/pageNotFound')
const errorHandler = require('./middlewares/errorHandler')

//middleware
app.use(express.json())

//routers
app.use('/api/v1/players', players)
app.use('/api/v1/teams', teams)
app.use(errorHandler)
app.use(wrongRoute)

const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () => {console.log(`App is running on port ${port}...`)})
    } catch (error) {
        console.log(error.message)
    }
}

start()