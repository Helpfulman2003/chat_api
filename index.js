const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
}) 

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

routes(app)

connectDB()

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});

let onlineUsers = {};

io.on('connection', socket => {
    console.log('A user connected: ' + socket.id);

    socket.on('add-user', (userId) => {
        console.log('User ' + userId + ' added');
        onlineUsers[userId]= socket.id
    });

    socket.on('send-msg', (data) => {
        console.log('Message from ' + data.from + ' to ' + data.to);
        let receiverSocketId = onlineUsers[data.to];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('msg-receive', data.message);
        }
    });

});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server start on Port ${process.env.PORT || 5000} `);
})



/*
    // Create an HTTP server from the Express app
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers = {};

io.on('connection', socket => {
  console.log('A user connected: ' + socket.id);

  socket.on('add-user', userId => {
    console.log('User ' + userId + ' added');
    onlineUsers[userId] = socket.id;
  });

  socket.on('send-msg', data => {
    console.log('Message from ' + data.from + ' to ' + data.to);
    let receiverSocketId = onlineUsers[data.to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('msg-receive', data.msg);
    }
  });
});

server.listen(process.env.PORT, () => {
    console.log(`Server start on Port ${process.env.PORT}`);
})
*/