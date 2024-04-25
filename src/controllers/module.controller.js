const express = require('express')
const moduleService = require('../services/module.service')
const router = express.Router()

router.get('/', async (req, res)=>{
    var id = req.query.id
    var result = await moduleService.GetModuleList(id)
    res.json(result);
})

module.exports = router