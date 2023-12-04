const express = require("express")
const userController = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.post("/setAvatar/:id", userController.setAvatar)
userRouter.get("/allusers/:id", userController.getAllUser)

module.exports = userRouter
