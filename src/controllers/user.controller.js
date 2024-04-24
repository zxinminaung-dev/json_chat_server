const express = require('express')
const {getUsers,saveUser,findByUserId,findByUserName,updateUser,DeleteUser} = require('../database/json.database')
const passwordService = require('../services/common/password.hash.service')
const Constant = require('../utils/constant')
const passport = require('passport')
const ResponseHelper = require('../utils/response.helper')
const Response = require('../utils/response')
const User = require('../models/user.model')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())
//passport.authenticate('jwt', { session: false }),
router.get('/', async (req, res) => {
    var id = req.query.id
    //var result = await getUsers(id);
    try{
        var response = new Response()
        var data =await User.findAll()
        response.data= data
        response.success=true
        response.recordsTotal= data.length
        //console.log(data)
        res.json(response);
    }catch(err){
        console.log(err)
    }
})
router.post('/', async (req, res) => {
    var result=new ResponseHelper();
    if (req.body.id > 0) {
        var user = await findByUserId(req.body.id);
        if(user!=null){
            user.name=req.body.name,
            user.username=req.body.username
            user.image= req.body.image            
           result = await updateUser(user);          
        }
        else{
            result.success=false;
            result.messages.push(Constant.User_Not_Found_Message)
        }
        res.json(result)
    }else{
        var hasUser = await findByUserName(req.body.username)
        if(hasUser==null){
            var newUser = {};
            newUser.id=0;
            newUser.username = req.body.username,
            newUser.name =req.body.name
            newUser.image=req.body.image
            newUser.online=false;
            newUser.password = await passwordService.hashPassword(req.body.password)
            result =await saveUser(newUser)
        }else{
            result.success=false;
            result.messages.push(Constant.Duplicate_User_Message)
        }
       
        res.json(result)
    }
    
})
router.get('/getbyid',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var id = req.query.id
    var user = await findByUserId(id);
    res.json(user);
})
router.delete('/',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var id = req.query.id
    var result = await DeleteUser(id);
    res.json(result)
})

module.exports = router;