const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`)
    next()
})

app.use(express.static('./static'))

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})