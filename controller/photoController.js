const {User,Photo} = require('../models')

async function getPhotos(req, res) {
    try {
      const { id } = req.UserData

      const data = await Photo.findAll({
        where: {
            User_id: id
        },
        include: [
          {
            model: User
          }
        ]
      })

      res.status(200).json(data)
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  } 

  async function getPhotoById(req, res) {
    try {

      const { id } = req.params

      const { id: User_id } = req.UserData

      const data = await Photo.findOne({
        where: {
          id,
        }
      })

      if (!data) {
        throw{
          code: 404,
          message: "Data not found!"
        }
      }

      if (data.User_id !== User_id) {
        throw{
          code: 403,
          message: "Forbiden"
        }
      } 

      res.status(200).json(data)
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  }

  async function createPhoto(req, res) {
    try {

      const { 
        tittle,
        caption,
        image_url
      } = req.body

      const { id } = req.UserData

      const result = await Photo.create({
        tittle,
        caption,
        image_url,
        User_id: id
      })
     
      res.status(201).json(result)
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  }

  async function updatePhotoById(req, res) {
    try {

      const { id } = req.params
      const { 
        tittle,
        caption,
        image_url
      } = req.body

      const result = await Photo.update({
        tittle,
        caption,
        image_url
      }, {
        where: {
            id
        },
        returning: true
      })
     
      res.status(201).json(result)
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  }

  async function deletePhotoById(req, res) {
    try {

      const { id } = req.params
      
      const result = await Photo.destroy({
        where: {
           id
        }
      })

      if (!result) {
        throw {
          code: 404,
          message: "Data not found!"
        }
      }
     
      res.status(201).json(result)
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  }

module.exports={
    getPhotoById,
    getPhotos,
    updatePhotoById,
    deletePhotoById,
    createPhoto
}