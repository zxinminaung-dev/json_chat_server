const {updateUser} = require ('../database/json.database')
const  messageService = require ("./base/socket.service")
updateStatusOnline = async (user) => {
    try {
        user.online = true;
        await updateUser(user)
        await messageService.userOnlineStatus(user);
        return user;
    } catch (e) {
        console.log(e);
    }
}
updateStatusOffline = async (user) => {
    try {
        user.online = false;
        await updateUser(user)
        await messageService.userOnlineStatus(user);
        return user;
    } catch (e) {
        console.log(e);
    }
}
module.exports = {updateStatusOnline,updateStatusOffline}
