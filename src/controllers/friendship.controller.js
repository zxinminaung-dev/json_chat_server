const express = require('express')
const Constant = require('../utils/constant')
const {GetFriendShip} = require('../database/json.database')
const passport = require('passport')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())
router.get('/',passport.authenticate('jwt', { session: false }),async(req,res)=>{
    var from = parseInt(req.query.from)
    var to = parseInt(req.query.to)
    var response = await GetFriendShip(from,to);
    res.json(response);
})
module.exports = router;