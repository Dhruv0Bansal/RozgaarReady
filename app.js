require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
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
        user: process.env.EMAIL_USER, // add-email
        pass: process.env.EMAIL_PASS, // add apps password
    },
});

async function convertHTMLToPDF(htmlContent, pdfFilePath){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set the page content
    await page.setContent(htmlContent);
    // Generate PDF
    await page.pdf({ path : pdfFilePath, format : 'A4', printBackground: true});
    // Open the generated PDF file in the default PDF viewer
    const open = await import('open');
    await open.default(pdfFilePath);
    //close the browser
    await browser.close();
}

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

app.post('/generate-pdf', async (req,res)=>{
    const { html } = req.body;
    let new_html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&family=Faster+One&family=Gabarito:wght@400..900&family=Manuale:ital@0;1&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montagu+Slab:opsz,wght@16..144,100..700&family=Mountains+of+Christmas&family=Nokora:wght@100&family=Playfair+Display:ital@0;1&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik+Burned&family=Unna:ital,wght@0,400;0,700;1,400;1,700&family=Vollkorn+SC&display=swap');
            .flex {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .d-flex {
                display: flex;
                align-items: center;
            }

            .flex-align-items {
                gap: 20px;
                display: flex;
                align-items: start;
                justify-content: space-between;
            }
            .centering {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            *, no-spacing {
                margin: 0px;
                padding: 0px;
            }

            #contain {
                position: relative;
                width: 210mm;
                background-color: #fff;
                padding: 50px;
                padding-top: 35px;
            }

            .lists {
                display: flex;
                gap: 30px;
            }

            .line {
                height: 1.5px !important;
                background-color: black;
                margin-bottom: 5px;
            }

            a {
                text-decoration: none;
                color: inherit;
                font-weight: normal;
                font-style: normal;
            }

            .bona-nova-sc-regular {
                font-family: "Bona Nova SC", serif;
                font-weight: 500;
                font-style: normal
            }

            .playfair-display-bold {
                font-family: "Playfair Display", serif;
                font-optical-sizing: auto;
                font-weight: 600;
                font-style: normal;
            }

            .playfair-display-regular {
                font-family: "Playfair Display", serif;
                font-optical-sizing: auto;
                font-weight: 500;
                font-style: normal;
            }

            .contacts {
                font-size: 20px;
            }

            .manuale {
                font-family: "Manuale", serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
            }

            .p-class {
                font-size: 20px;
                font-family: "Manuale", serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
            }

            span {
                margin-top: 5px;
                margin-bottom: 5px;
                font-size: 20px;
            }

            .subEdu,
            .workExp,
            .subProject,
            .subposition,
            .acheivement,
            .skills
            {
                margin-bottom: 8px;
            }

            .contact-details{
                display: flex;
                flex-direction: column;
                justify-content:flex-end;
                align-items: flex-end;
            }

            header{
                margin-bottom: 10px;
            }

            .head{
                font-size: 18px;
            }
            
            .status{
                font-size: 3rem;
                position: absolute;
                top: 40%;
                left: 11%;
                color: rgb(255, 0, 0, 0.3);
                transform: rotate(-45deg);
            }

            @layer base {
                img {
                    display: initial;
                }
            }
        </style>
    </head>

    <body>
        <div id = "contain">
            ${html}
        </div>
    </body>
    </html>
    `
    await convertHTMLToPDF(new_html, 'render.pdf');
    res.json({done : 200})
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
    let details = await auth.findOne({username : name})
    const data = object.toObject()
    data.email = details.email
    res.json(data)
})

app.listen(port, ()=>{
    console.log(`Server is listeing to PORT: ${port}`)
})