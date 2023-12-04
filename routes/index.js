const messageRouter = require("./messageRoutes")
const userRouter = require("./userRoutes")

const routes = (app) => {
    app.use("/api/auth", userRouter)
    app.use("/api/message", messageRouter)
}

module.exports = routes