require('dotenv').config();
const express = require('express')
const APP_SECRET="bbf1fbd5b287402e97e4c668da169a2fb8bdf863852f81587d35c5af9ef24f7f";
const userService = require('../services/user.service')
const {Login,updateUser,findByUserId} = require('../database/json.database')
const MailService = require('../services/mail.service')
const passwordService= require('../services/common/password.hash.service')
const jwt = require ('jsonwebtoken')
const passport = require('passport');
const { stat } = require('fs');
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
        var data={
            id:0,
            username:'',
            name:'',
            image:''
        }  
        if(result.data){
            data.id=result.data.id
            data.username=result.data.username,
            data.name=result.data.name,
            data.image=result.data.image
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

const users = {};
router.post('/register', async (req, res) => {
    const { email } = req.body;
    if(email!=null){
        const subject ="OTP Verification"

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const body = `Your OTP for registration is: ${otp}`
        // Save OTP with user email in memory
        users[email] = {
            otp,
            verified: false
        };
        try{
            await MailService.sendEmail(email, subject, body )
            res.status(200).json({ message: 'OTP sent successfully' });
        }catch(error){
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Failed to send OTP' });
        }
      
    }
    
})
//verify otp from email
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Check if user exists and OTP matches
    if (users[email] && users[email].otp === parseInt(otp, 10)) {
        users[email].verified = true;
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

// Route to handle user registration after OTP verification
router.post('/complete-registration', (req, res) => {
    try{
        const { name, username, email, password, status, expiry_date } = req.body;
    // Check if user is verified
    if (users[email] && users[email].verified) {
        // Save user details to database or perform any other action
        var user = {
            name:name,
            username: username,
            email: email,
            password : passwordService.hashPassword(password),
            status : status,
            expiry_date: expiry_date
        }
        res.status(200).json({ message: 'User registered successfully' });
    } else {
        res.status(400).json({ message: 'OTP verification required' });
    }
    }catch(err){
        res.status(500).json({ message: 'Something went wrong' });
    }
    
});


module.exports = router;

