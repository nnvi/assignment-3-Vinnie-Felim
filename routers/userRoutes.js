const express = require('express')
const app = express()
const ctr = require('../controller/userController')
const midd = require('../middleware/middleware')

app.get('/',ctr.getAllUsers)

app.post('/login',midd.inputLoginChecker,ctr.login)
app.post('/register',ctr.register)

module.exports = app