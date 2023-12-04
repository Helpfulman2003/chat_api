const Message = require("../model/messageModel")

const messageController = {
    getAllMessage: async(req, res, next) => {
        try {
            const {from, to} = req.body
            const messages = await Message.find({
                user: {
                    $all: [from, to]
                }
            }).sort({updateAt: 1})
            const projectMessage = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text
                }
            })

            return res.json({success: true, projectMessage})
        } catch (error) {
            next(error)
        }
    },
    addMessage: async(req, res, next) => {
        try {
            const {from , to, message} = req.body
            const data = await Message.create({
                message: {text: message},
                user: [from, to],
                sender: from,
            })
            if(data) {
                return res.json({success: true, msg: "Message added successfully."})
            }

        } catch (error) {
            next(error)
        }
    }
};

module.exports = messageController;
