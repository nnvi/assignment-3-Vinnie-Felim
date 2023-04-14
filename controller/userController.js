const {User, Photo} = require('../models')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "rahasia"

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  console.log(password)
  return hash
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password,hash)
}

async function getAllUsers(req,res){
    try {
        const data = await User.findAll({
          include: [
            {
              model: Photo
            }
          ]
        })
  
        res.status(200).json(data)
    } catch (error) {
    res.status(error?.code || 500).json(error)
    }
}

async function register(req,res){
    try {
        const {
          username,
          email,
        } = req.body
        const password = hashPassword(req.body.password)
        const data = await User.create({
          username,
          email,
          password
        })
  
        const response = {
          id: data.id,
          username: data.username,
          email: data.email
        }
  
        res.status(201).json(response)
  
    } catch (error) {
    res.status(error?.code || 500).json(error)
    
    }
}

async function login(req,res){
    try {
        const {
          email,
          password
        } = req.body
  
        const user = await User.findOne({
          where: {
            email: email
          }
        })
  
        if (!user) {
          throw {
            code: 404,
            message: "User not found"
          }
        }
        
        const isCorrect = comparePassword(password, user.password)
  
        if (!isCorrect) {
          throw {
            code: 401,
            message: "Incorrect password"
          }
        }
  
        const response = {
          id: user.id,
          email: user.email,
          username: user.username
        }
  
        const token = generateToken(response)
  
        res.status(200).json({
          response,
          token
        })
  
    } catch (error) {
    res.status(error?.code || 500).json(error)
    
    }
}

module.exports={
    verifyToken,
    login,
    register,
    getAllUsers,
    generateToken
}