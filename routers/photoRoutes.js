const express = require('express')
const app = express()
const ctr = require('../controller/photoController')

app.get('/',ctr.getPhotos)

app.get('/:id',ctr.getPhotoById)
app.post('/',ctr.createPhoto)
app.put('/:id',ctr.updatePhotoById)
app.delete('/:id',ctr.deletePhotoById)
module.exports = app