require('dotenv').config()
const express = require('express')
const cron = require('node-cron')
const DateHelper = require('./src/utils/date.helper')
const http = require('http')
const bodyParser = require('body-parser')
const { testConnection } = require('./src/database/database')
const cors = require('cors')
const socket = require('./src/services/base/socket.service')
const PORT =  process.env.APP_PORT;
const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//cors origin
var corsOptions = {
    origin: "*",
    methods: 'GET, POST, PUT, DELETE',
};
app.use(cors(corsOptions));

//import controllers
const userController = require('./src/controllers/user.controller')
const authController = require ('./src/controllers/auth.controller')
const messageController = require('./src/controllers/message.controller')
const smtpController =  require('./src/controllers/smtp.controller')
const projectController = require('./src/controllers/project.controller')
const moduleController = require('./src/controllers/module.controller')

//use controllers
app.use('/api/user', userController)
app.use('/api/auth',authController)
app.use('/api/message',messageController)
app.use('/api/smtp', smtpController)
app.use('/api/project', projectController)
app.use('/api/module', moduleController)

const server = http.createServer(app)
//scheduling the background service
//in every 1 minute '* * * * *'
//in every 24 hrs '0 0 * * *'
cron.schedule('* * * * *', () => {
    var date = new Date();
    console.log(DateHelper.formatDate(date));
    console.log("every 1 min")
}, {
    scheduled: true,
    timezone: 'Asia/Yangon' // Set timezone to Asia/Yangon
});
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

server.listen(PORT, async (data,error) => {
    if(error)console.log(error.message)
    if(data) console.log(data)
    await testConnection();
    console.log("server is listening on http://localhost:" + PORT)
})
