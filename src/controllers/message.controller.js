const express = require('express')
const Constant = require('../utils/constant')
const passport = require('passport')
require('../utils/passport.config')(passport)
const router = express.Router()
router.use(passport.initialize())

module.exports = router;