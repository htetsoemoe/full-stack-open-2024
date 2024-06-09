const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.status(200).json(blogs)
        })
})

module.exports = blogRouter