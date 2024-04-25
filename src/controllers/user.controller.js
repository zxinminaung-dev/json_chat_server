const express = require('express')
const passwordService = require('../services/common/password.hash.service')
const Constant = require('../utils/constant')
const passport = require('passport')
const ResponseHelper = require('../utils/response.helper')
const Response = require('../utils/response')
const User = require('../models/user.model')
const userService = require('../services/user.service')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())

//passport.authenticate('jwt', { session: false }),
router.get('/', async (req, res) => {
    var id = req.query.id
    //var result = await getUsers(id);
    try{
        var result = await userService.GetAll()
        //console.log(data)
        res.json(result);
    }catch(err){
        console.log(err)
    }
})
router.post('/', async (req, res) => {
    var result=new ResponseHelper();
   
})
router.get('/getbyid',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var id = req.query.id
})
router.delete('/',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var id = req.query.id
})

module.exports = router;