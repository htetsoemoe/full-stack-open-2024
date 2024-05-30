require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())

// using morgan - HTTP request logger middleware for node.js
morgan.format("reqFormat", (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : '',
    ].join(" ")
})

app.use(morgan("reqFormat"))
app.use(cors())

const PORT = process.env.PORT || 3001

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello World form Phone Book" })
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    const count = persons.length
    res.send(`
        <p>Phonebook has info for ${count} people</p> 
        <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ error: "name must be unique." })
    } else if (!body.name) {
        return res.status(400).json({ error: "name is missing." })
    } else if (!body.number) {
        return res.status(400).json({ error: "number is missing." })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person) //Combines two or more arrays. This method returns a new array without modifying any existing arrays
    res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// Unknown Endpoint Error Handler Middleware
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
