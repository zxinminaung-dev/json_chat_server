// const jsonServer = require ('json-server')
const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, 'db.json')
const Response = require('../utils/response')
const ResponseHelper = require('../utils/response.helper')
const passwordService = require('../services/common/password.hash.service')
const messageService = require ('../services/base/socket.service')
getUsers = async (id) => {
    var response = new Response();
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const result = JSON.parse(data);
        response.data = result.users.filter(x=>x.id!=id);
        response.recordsTotal = result.users.length;
        response.success = true;
        return response;
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        response.success = false;
        response.messages.push(error.message)
        return response;
    }
}
saveUser = async (user) => {
    var response = new ResponseHelper();
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const result = JSON.parse(data);
        var id = result.usercount + 1;
        var friendShipId = result.friendShipId
        user.id = id;
        result.users.push(user)
        result.usercount = id;
        if (id > 0) {
            result.users.forEach(element => {
                if (element.id != id) {
                    var friendShip = {};
                    friendShip.id = friendShipId + 1;
                    friendShip.user1 = id;
                    friendShip.user2 = element.id;
                    result.friendship.push(friendShip)
                    friendShipId++;
                }
            });
            result.friendShipId = friendShipId;
            const dataString = JSON.stringify(result, null, 2);// 2 spaces for indentation
            fs.writeFileSync(dbPath, dataString, 'utf8');
            response.success = true;
            response.id = id;
        }

        return response;
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        response.success = false;
        response.messages.push(error.message)
        return response;
    }
}
findByUserId = async (id) => {
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const result = JSON.parse(data);
        var response = result.users.filter(x => x.id == id)[0]
        return response;
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        return null;
    }
}
findByUserName = async (username) => {
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const result = JSON.parse(data);
        var response = result.users.filter(x => x.username == username)[0]
        return response;
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        return null;
    }
}
updateUser = async (user) => {
    var response = new ResponseHelper();
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const currentData = JSON.parse(data);
        const updatedData = {
            ...currentData,
            users: currentData.users.map(item => {
                if (item.id === user.id) {
                    return { ...item, ...user };
                }
                return item;
            })
        };
        const dataString = JSON.stringify(updatedData, null, 2); // 2 spaces for indentation
        fs.writeFileSync(dbPath, dataString, 'utf8');
        response.success = true;
        response.id = user.id
        return response;
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        response.success = false;
        response.messages.push(error.message)
        return response;
    }
}
DeleteUser = async (id) => {
    var response = new ResponseHelper();
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const currentData = JSON.parse(data);
        const updatedData = {
            ...currentData,
            users: currentData.users.filter(user => user.id != id)
        };
        const dataString = JSON.stringify(updatedData, null, 2); // 2 spaces for indentation
        fs.writeFileSync(dbPath, dataString, 'utf8');
        response.success = true;
        response.id = id;
    } catch (error) {
        console.log("server error : " + error)
        response.success = true;
        response.messages.push(err.message)
    }
    return response;
}
Login = async (username, password) => {
    var response = new ResponseHelper()
    if (username && password) {
        try {
            const data = await fs.readFileSync(dbPath, 'utf8');
            const resultData = JSON.parse(data);
            var result = resultData.users.filter(x => x.username == username)[0]
            if (result) {
                if (result.id > 0) {
                    var success = await passwordService.verifyPassword(password, result.password)
                    if (success) {
                        response.success = success
                        response.data = result
                        response.messages.push('Login Success')
                    } else {
                        response.success = success
                        response.messages.push('Invalid User Name or Password')
                    }
                } else {
                    response.success = success
                    response.messages.push('Invalid User Name or Password')
                }
            } else {
                response.success = false
                response.messages.push('Invalid User Name or Password')
            }
        } catch (error) {
            response.success = false;
            response.messages.push(error.message)
            console.log('Login Error :' + error.message)
        }
    }
    return response;
}
GetMessages = async (id) => {
    var response = new Response();    
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const resultData = JSON.parse(data);
        response.data = resultData.messages.filter(x => x.friendShipId == id);
        response.recordsTotal = response.data.length
        response.success = true;
    } catch (error) {
        response.success = false;
        response.messages.push(error.message)
    }
    return response;
}
SaveMessages = async (message) => {
    var response = new ResponseHelper();
    try {
        const data = await fs.readFileSync(dbPath, 'utf8');
        const result = JSON.parse(data);
        var messagecount = result.messagecount + 1;
        message.id = messagecount;
        result.messages.push(message)
        result.messagecount = messagecount
        const dataString = JSON.stringify(result, null, 2);// 2 spaces for indentation
        fs.writeFileSync(dbPath, dataString, 'utf8');
        response.success = true;
        response.id = message.id;
        messageService.sendMessageToClients(message)
    } catch (error) {
        console.log('message server error : ' + error.message)
        response.success = false;
        response.messages.push(error.message)
    }
}
GetFriendShip = async (from, to) => {
    var response = new ResponseHelper();
    var result = [];
    const data = await fs.readFileSync(dbPath, 'utf8');
    const json = JSON.parse(data);
    result = json.friendship.filter(x => x.user1 == from && x.user2 == to)
    if (result.length>0) {
        var friendShip = result[0];
        response.id = friendShip.id;
        response.data=friendShip
    }
    else {
        result = json.friendship.filter(x => x.user2 == from && x.user1 == to)
        if (result.length>0) {
            var friendShip = result[0];
            response.id = friendShip.id;
            response.data=friendShip
        }
        else{
            var friendShip = {};
            friendShip.id = json.friendShipId + 1;
            friendShip.user1 = from;
            friendShip.user2 = to;
            json.friendship.push(friendShip)
            json.friendShipId=friendShip.id
            const dataString = JSON.stringify(json, null, 2);// 2 spaces for indentation
            fs.writeFileSync(dbPath, dataString, 'utf8');
            response.id=friendShip.id
            response.data=friendShip
        }
    }
    return response;
}
module.exports = {
    getUsers, saveUser, findByUserId, updateUser,
    findByUserName, Login, DeleteUser, GetMessages,
    SaveMessages,GetFriendShip
}