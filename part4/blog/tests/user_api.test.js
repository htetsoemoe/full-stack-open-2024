const assert = require("node:assert")

const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const supertest = require("supertest")

const { test, describe, beforeEach, after } = require("node:test")
const User = require("../models/user")
const app = require("../app")
const test_helper = require("./test_helper")

const api = supertest(app)

describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await test_helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test("get all users from DB", async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log(result._body)
    })

    test("creation of a user succeeds", async () => {
        const usersAtStart = await test_helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await test_helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((user) => user.username)
        assert(usernames.includes(newUser.username))
    })
})

after(async () => {
    await mongoose.connection.close()
})