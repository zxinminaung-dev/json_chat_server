require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const socket = require('./src/services/base/socket.service')
const PORT =  4500;
const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//cors origin
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

//import controllers
const userController = require('./src/controllers/user.controller')
const authController = require ('./src/controllers/auth.controller')
const messageController = require('./src/controllers/message.controller')
const friendshipController = require('./src/controllers/friendship.controller')
//use controllers
app.use('/api/user', userController)
app.use('/api/auth',authController)
app.use('/api/message',messageController)
app.use('/api/friendship',friendshipController)
const server = http.createServer(app)
//socket connection
const io=socket.init(server)
io.on('connection', (socket) => {
    socket.on('connect', () => {
        const message = 'Connection Success';
    })
    socket.on('user', (data) => {
        console.log('user '+ data)
    })
    // Handle events when a user connects, disconnects, etc.
    // You can also handle custom events here.
    socket.on('send-message', (data) => {
        var data = JSON.stringify(data);
        console.log(`Received message: ${data}`);
        // You can add your logic here to handle the received message
    });
    socket.on('disconnect', (err) => {
        console.log('User disconnected', err);
        // io.emit('disconnect',err.message)
    });
    socket.on('error',(err)=>{
        console.log('Error', err);
    })
});



server.listen(PORT, (data,error) => {
    if(error)console.log(error.message)
    console.log("server is listening on http://localhost:" + PORT)
})
