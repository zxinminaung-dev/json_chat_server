const passwordService = require('../services/common/password.hash.service')
const ResponseHelper = require('../utils/response.helper')
const Response = require('../utils/response')
const User = require('../models/user.model')

GetAll = async () => {
    try{
        var response = new Response()
        response.data = await User.findAll()
        response.success = true 
        response.recordsTotal = response.data.length
        return response 
    }catch(err){
        console.log(err)
    }   
}

Login = async (username, password) => {
    var response = new ResponseHelper()
    if (username && password) {
        try {            
            var result = await User.findOne({ where: { UserName: username } })
            if (result) {
                if (result.Id > 0) {
                    var success = await passwordService.verifyPassword(password, result.Password)
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
    return response
}

FindById = async (id) =>{    
    var result = await User.findOne({ where: { Id: id } });
    return result
}


module.exports = { GetAll, Login , FindById}
