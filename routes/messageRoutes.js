const express = require("express")
const messageController = require("../controllers/messageController")
const messageRouter = express.Router()

messageRouter.post("/getmsg", messageController.getAllMessage)
messageRouter.post("/addmsg", messageController.addMessage)


module.exports = messageRouter
