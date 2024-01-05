const express = require('express')
const Constant = require('../utils/constant')
const passport = require('passport')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())
const {GetMessages,SaveMessages} = require('../database/json.database')
router.get('/',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var friendShipId = parseInt(req.query.id)
    var response = await GetMessages(friendShipId);
    res.json(response);
})
router.post('/',passport.authenticate('jwt', { session: false }),async (req,res) => {
    console.log('sendmesage')
    var message = {};
    message.id = req.body.id
    message.text = req.body.text
    message.from = req.body.from
    message.to = req.body.to
    message.friendShipId = req.body.friendshipId
    message.isImage = req.body.isImage
    var response =await SaveMessages(message);
    res.json(response)
})
module.exports = router;