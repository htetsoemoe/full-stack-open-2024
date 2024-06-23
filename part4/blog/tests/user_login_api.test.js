const assert = require("node:assert")

const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const supertest = require("supertest")

const { test, describe, beforeEach, after } = require("node:test")
const User = require("../models/user")
const app = require("../app")
const test_helper = require("./test_helper")

const api = supertest(app)

describe("user login", () => {
    test("user login successful", async () => {
        const loginUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})