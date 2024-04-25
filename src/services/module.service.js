const dbContext = require('../database/database')
const Response = require('../utils/response')
const Sequelize = require('sequelize')

GetModuleList = async (id) =>{
    var response = new Response()
    try{
        var query ="select * from Module where ProjectId=?"
        var result = await dbContext.sequelize.query(query,{
            replacements:[id],
            type: Sequelize.QueryTypes.SELECT
        })
        result.forEach(module => {
            
        });
    }catch(err){
        response.success = false;
        response.messages.push(err.name)
    }
    return response
}

module.exports = { GetModuleList }