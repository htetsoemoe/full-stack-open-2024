const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const assert = require("node:assert")
const testHelper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

describe("When test starts initialize the DB with data", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log(`\n------- Database Cleared! -------\n`)

        // Initialize db with some data
        const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog))
        const blogPromiseArray = blogObjects.map((blog) => blog.save())
        await Promise.all(blogPromiseArray)

        console.log(`\n------- Database Created! -------\n`)
    })

    test("Blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("All blogs must returned", async () => {
        const response = await api.get("/api/blogs")
        // console.log(response)
        assert.strictEqual(response._body.length, 3)
    })

    test("Blog has an id property", async () => {
        const response = await api.get("/api/blogs")
        assert.strictEqual(response._body[0].hasOwnProperty('id'), true)
    })

    // Adding a new blog
    describe("Adding of a new blog", () => {
        test("add a new blog", async () => {
            const newBlog = {
                title: 'String3',
                author: 'String3',
                url: 'String3',
                likes: 7,
            }

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const totalBlogsOfAfterNewPost = await testHelper.blogsInDb()
            assert.strictEqual(testHelper.initialBlogs.length + 1, totalBlogsOfAfterNewPost.length)

        })

        test("Must be likes default value is zero on POST request if there is no likes property", async () => {
            const newBlog = {
                title: "String3",
                author: "String3",
                url: "String3",
            }

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const totalBlogsOfAfterNewPost = await testHelper.blogsInDb()
            assert.strictEqual(totalBlogsOfAfterNewPost[totalBlogsOfAfterNewPost.length - 1].likes, 0)
        })

        test("If title or url property is missing and the server must returns 400", async () => {
            // no title case
            const newBlog = {
                author: 'String3',
                url: 'String3',
                likes: 3,
            };

            // no url case
            const newBlog1 = {
                title: 'String4',
                author: 'String4',
                likes: 4,
            };

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400)

            await api
                .post("/api/blogs")
                .send(newBlog1)
                .expect(400)

            // Must be same initialBlogsInDb and after post request is done
            const totalBlogsOfAfterNewPost = await testHelper.blogsInDb()
            assert.strictEqual(totalBlogsOfAfterNewPost.length, testHelper.initialBlogs.length)
        })
    })

    // Deleting a existed a blog
    describe("Deleting a existed a blog", () => {
        test("Deleting a existed blog must be successful", async () => {
            const newBlog = {
                title: 'Blog to delete',
                author: 'TestAuthor',
                url: 'http://testurl.com',
                likes: 11,
            }

            const addedNewPost = await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)
            // console.log(addedNewPost)

            // Delete a blog
            const totalBlogsOfAfterAddingNewBlog = await testHelper.blogsInDb()

            await api
                .delete(`/api/blogs/${addedNewPost._body.id}`)
                .expect(204)

            const totalBlogsOfAfterDeletingBlog = await testHelper.blogsInDb()
            assert.strictEqual(totalBlogsOfAfterDeletingBlog.length, totalBlogsOfAfterAddingNewBlog.length - 1)

            const titles = totalBlogsOfAfterDeletingBlog.map((blog) => blog.title)
            assert(!titles.includes(addedNewPost._body.title))
        })

        test("delete api blog not found", async () => {
            const blogToDelete = { id: 111 }

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(400)
        })
    })

    // Updating a blog
    describe("Update blog with id", () => {
        test("update a specific blog post", async () => {
            const totalBlogsAtStart = await testHelper.blogsInDb()
            const blogToUpdate = totalBlogsAtStart[0]
            const updateData = { likes: 300 }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updateData)
                .expect(200)

            const totalBlogsAtEnd = await testHelper.blogsInDb()
            const updatedBlog = totalBlogsAtEnd.find((blog) => blog.id === blogToUpdate.id)

            assert.strictEqual(updatedBlog.likes, 300)
        })

        test("update api blog not found", async () => {
            const blogToUpdate = { id: 111 }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send({ likes: 300 })
                .expect(400)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})