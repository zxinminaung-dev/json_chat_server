// Import Socket.IO instance
const socketio = require('socket.io');
let io;
module.exports =  {
    init: function (server) {
        io = socketio(server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });
        return io;
    },
    getIO: function () {
        if (!io) {
            throw new Error("Can't get io instance before calling .init()");
        }
        return io;
    },
    sendMessageToClients: function (message) {
        io.emit('message', message);
    },
    sendCount: function (count) {
        console.log(count)
        io.emit('count', count);
    },
    userOnlineStatus:function(user){
        io.emit('online', user);
    }
    
}