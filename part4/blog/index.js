require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)
console.log(`Connected to MongoDB...`)

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.status(200).json(blogs)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})