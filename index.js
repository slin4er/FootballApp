const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const app = express()
const teams = require('./routes/player')
const connectDB = require('./db/connect')

//middleware
app.use(express.json())

//routers
app.use('/api/v1/player', teams)
connectDB(process.env.MONGODB_URI).then(() => {
    app.listen(port, () => {
        console.log(`Football app is running on port ${port}`)
    })
}).catch((err) => err.message)