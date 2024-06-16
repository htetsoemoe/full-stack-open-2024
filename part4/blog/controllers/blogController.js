const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.post('/', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)

    // const blog = new Blog(req.body)

    // blog
    //     .save()
    //     .then(result => {
    //         res.status(201).json(result)
    //     })
})

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)

    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.status(200).json(blogs)
    //     })
})

module.exports = blogRouter