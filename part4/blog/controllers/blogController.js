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
})

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})

blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(400).json({ error: "blog not found!" })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(400).json({ error: "blog not found!" })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedBlog)
})

module.exports = blogRouter