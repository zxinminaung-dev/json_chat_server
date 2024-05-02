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
        result.forEach(async (module) => {
            var taskQurey ="select * from Tasks where ModuleId=?"
            var data = {
                Id : 0,
                Name : '',
                Tasks:[]
            }
            data.Id = module.Id
            data.Name = module.Name
            data.Tasks = await dbContext.sequelize.query(taskQurey,{
                replacements:[id],
                type: Sequelize.QueryTypes.SELECT
            })
        });
    }catch(err){
        response.success = false;
        response.messages.push(err.name)
    }
    return response
}

module.exports = { GetModuleList }