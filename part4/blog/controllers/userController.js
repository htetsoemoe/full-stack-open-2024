const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body

    if (username.length < 3) {
        return res.status(400).json({ error: "Username needs to be at least 3 characters long!" })
    }

    if (password.length < 3) {
        return res.status(400).json({ error: "Password must be at least 3 characters." })
    }

    const existedUser = await User.findOne({ username })
    if (existedUser) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    // Create User Document
    const user = new User({
        username,
        name,
        passwordHash,
    })

    // Save created user to DB
    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

module.exports = userRouter