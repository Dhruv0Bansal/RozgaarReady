const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/home.html'))
})

router.get('/templates', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/templates.html'))
})

router.get('/recomendation', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/recomendation.html'))
})

router.get('/:name', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/userinfo.html'))
})

module.exports = router