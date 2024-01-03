require('dotenv').config();
const express = require('express')
const APP_SECRET="bbf1fbd5b287402e97e4c668da169a2fb8bdf863852f81587d35c5af9ef24f7f";
const socketService = require('../services/base/socket.service')
const userService = require('../services/user.service')
const {Login,updateUser,findByUserId} = require('../database/json.database')
const jwt = require ('jsonwebtoken')
const passport = require('passport')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())
router.post('/login',async(req,res)=>{
    var token;
    try{
        const {username,password}=req.body
        var result=await Login(username,password)
        if(result.success){
            // Generate a JWT token for the authenticated user
            token= jwt.sign({
                iss: result.data.username,
                sub: result.data.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            }, APP_SECRET);           
        }  
        var data={}  
        if(result.data){
            data.id=result.data.id
            data.username=result.data.username,
            data.name=result.data.name,
            data.role_id= result.data.role_id
        }
        data.token=token;  
        data.success=result.success
        data.messages=result.messages
    }catch(error){
        console.log(error)
    }   
    if(result.success){
        var user =await findByUserId(result.data.id)
        await userService.updateStatusOnline(user);
    }
    res.json(data);
})
router.post('/logout',async(req,res)=>{
    var id =req.query.id
    console.log(id)
    var user = await findByUserId(id)
    await userService.updateStatusOffline(user);
    res.status(200).json({message:'Logout Successfully'})
})
module.exports = router;

