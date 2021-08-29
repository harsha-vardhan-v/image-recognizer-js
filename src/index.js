const express = require('express')
const path = require('path')
const app = express()

app.use((req, res, next) => {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`)
    next()
})

app.use(express.static(path.join(__dirname, 'static')))

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})