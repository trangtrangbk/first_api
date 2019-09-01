const express = require('express')
const app = express()

const router = require('./routes/user.js')

app.use(router)
app.listen(3002)

