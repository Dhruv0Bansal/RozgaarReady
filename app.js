const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const home = require('./routes/RozgaarReady')
const auth = require('./models/auth.js')
const user_info = require('./models/userdata.js');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rozgaarready@gmail.com",
        pass: "oqxkfsdiqpmkqrcn",
    },
});

async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/rozgaar")
}
connectDB()

function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

const app = express()
const port = 3000

app.use('/rozgaarready', home)
app.use(express.static("static"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.post('/log', async (req, res)=>{
    const data = await auth.findOne({username : req.body.username})
    if(data != null && await argon2.verify(data.password,req.body.password) == true){
        res.json({ status : 200, username : req.body.username, message : "User found"})
    }else{
        res.json({ status : 404 , message : "Invalid Credentials"})
    }
})

app.post('/otp', async (req, res)=>{
    const email = req.body.email
    let find = await auth.findOne({email : email})
    if(find == null){
        let otp = generateSixDigitNumber().toString()
        const info = await transporter.sendMail({
        from: "rozgaarready@gmail.com",
        to: email,
        subject: "SIGN-UP OTP",
        text: "Your one time password is " + otp,
        });
        res.json({otp : otp, message : `OTP sent to ${email}`})
    }else{
        res.json({status : 100, message : "Email already exists"})
    }
})

app.post('/otp-forget', async (req, res)=>{
    const email = req.body.email
    console.log(email)
    let find = await auth.findOne({email : email})

    if(find != null){
        let otp = generateSixDigitNumber().toString()
        const info = await transporter.sendMail({
        from: "rozgaarready@gmail.com",
        to: email,
        subject: "SIGN-UP OTP",
        text: `${find.username} Your one time password is ${otp}`,
        });
        res.json({otp : otp, message : `OTP sent to ${email}`})
    }else{
        res.json({status : 100, message : "Email dont exists"})
    }
})

app.post('/sign', async (req, res)=>{
    const email = req.body.email
    const user = req.body.username
    const password = await argon2.hash(req.body.password)
    let find = await auth.findOne({email : email})
    if(find == null){
        const newData = new auth({email : email, username : user, password : password})
        await newData.save()
        const newUser = new user_info({username : user})
        await newUser.save()
        res.json({status : 200, message : "Usersaved", done : true})
    }else{
        res.json({status : 100, message: "Username already exits", done : false})
    }
})

app.post('/change-password', async (req, res)=>{
    let email = req.body.email
    let password = await argon2.hash(req.body.newPass)
    await auth.updateOne({email : email}, {password : password})
    res.json({status:200, message : "Password Changed"})
})

app.post('/update-user', async (req,res)=>{
    let object = req.body
    await user_info.replaceOne({username : object.username}, object)
    res.json({message : "user data updated successfully"})
})

//GET REQUESTS
//Main INDEX OF THE WEBSITE

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + '/templates/signup.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/templates/login.html')
})

app.get('/forget-password', (req,res)=>{
    res.sendFile(__dirname + '/templates/forgetpassword.html')
})

app.get('/populate/:name', async (req, res)=>{
    let name = req.params.name
    let object = await user_info.findOne({username : name})
    res.json(object)
})

app.listen(port, ()=>{
    console.log(`Server is listeing to PORT: ${port}`)
})