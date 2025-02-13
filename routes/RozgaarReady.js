const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/home.html'))
})

router.get('/update-user', (req, res)=>{
    res.sendFile(path.join(__dirname,'../templates/updateuser.html'))
})

router.get('/resume-templates', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/templates.html'))
})

router.get('/recomendation', (req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/recomendation.html'))
})

router.get('/temp-1', (req, res)=>{
    res.sendFile(path.join(__dirname,'../templates/resumeT1.html'))
})

router.get('/temp-2', (req, res)=>{
    res.sendFile(path.join(__dirname,'../templates/resumeMNIT.html'))
})

module.exports = router