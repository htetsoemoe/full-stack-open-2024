require('dotenv').config()
const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3500

app.get('/', (req, res) => {
    res.status(200).json({msg: "Hello World form Phone Book"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
