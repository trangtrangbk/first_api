const express = require('express')
const app = express()

const router = require('./routes/user.js')
const PORT = process.env.PORT || 3002
app.use(router)
app.listen(PORT)

