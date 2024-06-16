const { test, after } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const assert = require("node:assert")

const api = supertest(app)

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("All blogs must returned", async () => {
    const allBlogs = await api.get("/api/blogs")
    assert.strictEqual(allBlogs._body.length, 2)
})

test("Blog has id property", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response._body[0].hasOwnProperty('id'), true)
})

test("add a new blog", async () => {
    const initialBlogs = await api.get("/api/blogs") // returns Response object
    const totalInitialBlogs = initialBlogs._body.length
    console.log(`Total Blogs, Before adding a new blog: ${totalInitialBlogs}`)

    const newBlog = {
        author: "Testing Author",
        likes: 3,
        title: "This is new title",
        url: "testingURL",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const totalBlogs = await api.get("/api/blogs")
    console.log(`Total Blog, After adding a new blog: ${totalBlogs._body.length}`)

    assert.strictEqual(totalInitialBlogs + 1, totalBlogs._body.length)
})

test("Must be likes default value is zero on POST request", async () => {
    const newBlog = {
        author: "No Like Author",
        title: "This is no likes title",
        url: "testingURL",
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const totalBlogs = await api.get("/api/blogs")
    console.log(totalBlogs._body[totalBlogs._body.length - 1].likes)

    assert.strictEqual(totalBlogs._body[totalBlogs._body.length - 1].likes, 0)
})

test("If title or url property is missing and the server must returns 400", async () => {
    const initialBlogs = await api.get("/api/blogs") // returns Response object
    const totalInitialBlogs = initialBlogs._body.length
    console.log(`Total Blogs, Before adding a new blog: ${totalInitialBlogs}`)

    // No 'title' property test
    const newBlogNoTitle = {
        author: "Testing Author",
        likes: 13,
        url: "testingURL",
    }

    // No 'url' property test
    const newBlogNoURL = {
        author: "Testing Author",
        likes: 13,
        title: "New Blog no url",
    }

    await api
        .post("/api/blogs")
        .send(newBlogNoURL)
        .expect(400)

    const totalBlogs = await api.get("/api/blogs")
    const finalBlogs = totalBlogs._body.length
    console.log(`Total Blogs, After adding a new blog with missing a property: ${finalBlogs}`)

    assert.strictEqual(totalInitialBlogs, finalBlogs)
})

after(async () => {
    await mongoose.connection.close()
})