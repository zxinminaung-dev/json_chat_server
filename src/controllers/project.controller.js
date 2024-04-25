const express = require('express')
const Project = require('../models/project.model')
const Module = require('../models/module.model')
const Response = require('../utils/response')
const projectMemberService = require('../services/project.member.service')

const router = express.Router()
const passport = require('passport')
require('../utils/passport.config')(passport)

router.use(passport.initialize())

router.get('/',passport.authenticate('jwt', { session: false }), async(req,res) =>{
    var response = new  Response()
    Project.findAll({
        include: [{
            model: Module,
            attributes: ['Id', 'Name','ProjectId'] // Specify which module attributes to include
        }]
    }).then(projects => {
        response.data = projects
        response.recordsTotal = projects.length
        response.success = true
        res.json(response)
    }).catch(error => {
        console.error('Error fetching projects:', error);
        response.messages.push(error)
        res.json(response)
    });
})
router.get('/getmembers',passport.authenticate('jwt', { session: false }), async(req,res) =>{
    var id = req.query.id
    console.log(id)
    var result = await projectMemberService.GetProjectMembersByProjectId(id);
    res.json(result)    
})

module.exports = router