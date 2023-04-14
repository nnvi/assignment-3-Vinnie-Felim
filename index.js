const express = require('express')
const app = express()
const port = 7011
const routes = require('./routers/routes')
const env = process.env.NODE_ENV

app.use(express.json())

app.use(routes)

if(env !=="test"){
    app.listen(port, function(){
        console.log(`server run at http://localhost:${port}/`)
    })
}

module.exports= app