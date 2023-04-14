const req = require('supertest')
const app = require('../index')
const {User,Photo} = require('../models')
const {generateToken} = require('../controller/userController')

describe("POST /photo/",()=>{
    let token
    let id
    let User_id

    beforeAll(async ()=>{
        try{
            const user = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "admin",
              })
         
            token = await generateToken({
                id: user.id,
                email: user.email,
                username: user.username,
              })
         
              const photo = await Photo.create({
                titlte: "Gambar Bunga",
                caption: "Bunga ini Bunga pertama",
                image_url: "https://cobacoba.com",
                User_id: user.id,
              })
              id = photo.id
              User_id = user.id
        }catch(err){
            throw err
        }
    })
    //test create photo success
    it('should be response 201',(done)=>{
        req(app)
        .post('/photo/')
        .set("token",token)
        .send({
            tittle:"gambar 1",
            caption:"ini gambar coba coba",
            image_url: "https://testing.com",
            User_id : User_id
        })
        .expect(201)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("tittle")
            expect(res.body).toHaveProperty("caption")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body).toHaveProperty("User_id")
            expect(res.body).toHaveProperty("createdAt")
            expect(res.body).toHaveProperty("updatedAt")
            done()
        })
    })
    //test create photo error karena tidak menyertakan token
    it('should be response 401',(done)=>{
        req(app)
        .post('/photo/')
        .send({
            tittle:"gambar 1",
            caption:"ini gambar coba coba",
            image_url: "https://testing.com",
            User_id : User_id
        })
        .expect(401)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body).toHaveProperty("code")
            expect(res.body).toHaveProperty("message")
            done()
        })
    })

    afterAll(async () => {
        try {
          await User.destroy({
            where: {},
          })
     
          await Photo.destroy({
            where: {},
          })
        } catch (err) {
          console.log(err)
        }
      })
})

describe("GET /photo/",()=>{
    let token
    let id
    let User_id

    beforeAll(async ()=>{
        try{
            const user = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "admin",
              })
         
            token = await generateToken({
                id: user.id,
                email: user.email,
                username: user.username,
              })
         
              const photo = await Photo.create({
                titlte: "Gambar Bunga",
                caption: "Bunga ini Bunga pertama",
                image_url: "https://cobacoba.com",
                User_id: user.id,
              })
              id = photo.id
              User_id = user.id
        }catch(err){
            throw err
        }
    })
    //test get all photo success
    it('should be response 200',(done)=>{
        req(app)
        .get('/photo/')
        .set("token",token)
        .expect(200)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body[0]).toHaveProperty("id")
            expect(res.body[0]).toHaveProperty("tittle")
            expect(res.body[0]).toHaveProperty("caption")
            expect(res.body[0]).toHaveProperty("image_url")
            expect(res.body[0]).toHaveProperty("User_id")
            expect(res.body[0]).toHaveProperty("createdAt")
            expect(res.body[0]).toHaveProperty("updatedAt")
            expect(res.body[0]).toHaveProperty("User")
            done()
        })
    })
    //test get all photo error karena tidak menyertakan token
    it('should be response 401',(done)=>{
        req(app)
        .get('/photo/')
        .expect(401)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body).toHaveProperty("code")
            expect(res.body).toHaveProperty("message")
            done()
        })
    })

    afterAll(async () => {
        try {
          await User.destroy({
            where: {},
          })
     
          await Photo.destroy({
            where: {},
          })
        } catch (err) {
          console.log(err)
        }
      })
})

describe("GET /photo/:id",()=>{
    let token
    let id
    let User_id
    let photo_id =4

    beforeAll(async ()=>{
        try{
            const user = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "admin",
              })
         
            token = await generateToken({
                id: user.id,
                email: user.email,
                username: user.username,
              })
         
              const photo = await Photo.create({
                titlte: "Gambar Bunga",
                caption: "Bunga ini Bunga pertama",
                image_url: "https://cobacoba.com",
                User_id: user.id,
              })
              id = photo.id
              User_id = user.id
        }catch(err){
            throw err
        }
    })
    //test get photo by id success
    it('should be response 200',(done)=>{
        req(app)
        .get('/photo/'+id)
        .set("token",token)
        .expect(200)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("tittle")
            expect(res.body).toHaveProperty("caption")
            expect(res.body).toHaveProperty("image_url")
            expect(res.body).toHaveProperty("User_id")
            expect(res.body).toHaveProperty("createdAt")
            expect(res.body).toHaveProperty("updatedAt")
            done()
        })
    })
    //test get photo error karena id photo tidak ditemukan
    it('should be response 404',(done)=>{
        req(app)
        .get('/photo/'+ photo_id)
        .set("token",token)
        .expect(404)
        .end((err,res)=>{
            if (err){done(err)}
            expect(res.body).toHaveProperty("code")
            expect(res.body).toHaveProperty("message")
            done()
        })
    })

    afterAll(async () => {
        try {
          await User.destroy({
            where: {},
          })
     
          await Photo.destroy({
            where: {},
          })
        } catch (err) {
          console.log(err)
        }
      })
})