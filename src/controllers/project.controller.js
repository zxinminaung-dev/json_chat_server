const express = require('express')
const projectMemberService = require('../services/project.member.service')
const projectService = require('../services/project.service')

const router = express.Router()
const passport = require('passport')
require('../utils/passport.config')(passport)

router.use(passport.initialize())

router.get('/',passport.authenticate('jwt', { session: false }), async(req,res) =>{
   var result = await projectService.GetAll()
   res.json(result)
})

router.get('/custom_query', async (req,res)=>{
    var result = await projectService.GetAllCustomQurey()
    res.json(result)
})

router.get('/getmembers',passport.authenticate('jwt', { session: false }), async(req,res) =>{
    var projectId = req.query.id
    var result = await projectMemberService.GetProjectMembersByProjectId(id)
    res.json(result)    
})

module.exports = router