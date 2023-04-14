const express = require("express");
const app = express();
const user = require('./userRoutes')
const photo = require('./photoRoutes')
const auth = require('../middleware/middleware')

app.use('/users',user)

app.use(auth.auth)

app.use('/photo',photo)
module.exports = app