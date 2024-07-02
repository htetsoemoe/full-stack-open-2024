const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
    const body = req.body
    const user = req.user // logged-in user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save() // update logged-in user's blog list
    res.status(201).json(savedBlog)
})

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.status(200).json(blogs)
})

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const user = req.user // logged-in user
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(400).json({ error: "blog not found!" })
    }

    console.log("Blog's userId: ", blog.user)
    console.log("Logged In userId: ", user._id)

    if (blog.user.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'only the creator can delete this blog' })
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