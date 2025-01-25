const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const home = require('./routes/RozgaarReady')
const auth = require('./models/auth.js')

async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/rozgaar")
    console.log("Database Connected")
}

connectDB()

const app = express()
const port = 3000

app.use('/rozgaarready', home)
app.use(express.static("static"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/templates/index.html')
})









app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/templates/login.html')
})

app.post('/log', async (req, res)=>{
    const data = await auth.findOne({username : req.body.username})
    if(data != null && data.password == req.body.password){
        res.json({ status : 200, username : req.body.username, message : "User found"})
    }else{
        res.json({ status : 404 , message : "User not found"})
    }
})











































app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + '/templates/signup.html')
})

app.listen(port, ()=>{
    console.log(`Server is listeing to PORT: ${port}`)
})