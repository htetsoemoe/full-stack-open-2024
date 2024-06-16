const express = require('express')
require("express-async-errors")
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')

const app = express()

// Connecting to MongoDB
mongoose.set('strictQuery', false)
logger.info("Connecting to ", config.MONGODB_URL)

mongoose
    .connect(config.MONGODB_URL)
    .then(() => {
        logger.info("Connected to MongoDB...")
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB: ", error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app