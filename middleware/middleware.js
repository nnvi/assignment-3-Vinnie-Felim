const{User}=require('../models')
const ctr = require('../controller/userController')
const {verifyToken} = require('../controller/userController')

function inputLoginChecker(req,res,next){
    if(req.body.email=== null || req.body.email=== undefined ||req.body.email===""){
        res.status(400).send("Username anda Kosong !")
    }else if( req.body.password === null || req.body.password === undefined || req.body.password ===""){
        res.status(400).send("Password anda Kosong !")
    }
    next()
}

async function auth(req,res,next){
    try {
        const { token } = req.headers
        console.log(token)
    
        if (!token) {
          throw {
            code: 401,
            message: "Token not provided!"
          }
        }
    
        const decode = verifyToken(token)
    
        console.log(decode, "<< decode token");
    
        const user = await User.findOne({
          where: {
            id: decode.id,
            email: decode.email
          }
        })
    
        if (!user) {
          throw{
            code: 401,
            message: "User not found"
          }
        }
    
        req.UserData = {
          id: user.id,
          email: user.email,
          username: user.username
        }
    
        next()
      } catch (error) {
        res.status(error?.code || 500).json(error)
      }
}

module.exports= {inputLoginChecker,auth}