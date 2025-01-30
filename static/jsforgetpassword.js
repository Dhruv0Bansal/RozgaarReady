const form1 = document.getElementById('one-time-block')
const form2 = document.getElementById('change-form')

let otp = null
let email = null
form1.addEventListener('submit', async (event)=>{
    event.preventDefault()
    email = document.getElementById('email').value;
    let response = await fetch('/otp-forget', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({email})
    })
    let reply = await response.json()
    otp = reply.otp;
    alert(reply.message)
})

form2.addEventListener('submit', async (event)=>{
    event.preventDefault()
    console.log("Hello")

    const otpField = document.getElementById('otp').value
    const newPass = document.getElementById('new-password').value
    const checkPass = document.getElementById('check-password').value

    if(otpField != otp){
        alert("INVALID OTP")
        return
    }
    if(newPass !== checkPass){
        alert("Enter Password Corectly")
        return
    }
    
    let response = await fetch('/change-password', {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({email,newPass})
    })

    let reply = await response.json()

    alert(reply.message)

    if(reply.status == 200){
        window.location.href = '/login'
    }
})