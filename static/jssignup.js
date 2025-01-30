const form1 = document.getElementById('one-time-block')
const form2 = document.getElementById('user-entry')

sessionStorage.username = null

function validateUsername(username) {
    const usernameRegex = /^[a-z0-9_]+$/; // Regex pattern for valid characters
    return usernameRegex.test(username) && !username.includes(' '); // Check for spaces explicitly
}

function verification(otp1,otp2){
    return otp1 == otp2
}

let otp = undefined;

form1.addEventListener('submit', async (event)=>{
    event.preventDefault()
    alert("OTP SENT")
    const email = document.getElementById('email').value;
    let response = await fetch('/otp', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({email})
    })
    let reply = await response.json()
    otp = reply.otp;
    console.log(reply)
})


form2.addEventListener('submit', async (events)=>{
    
    events.preventDefault()
    const email = document.getElementById('email').value;
    const otp_got = document.getElementById('otp').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const re_password = document.getElementById('re-password').value

    if(validateUsername(username) == false || verification(otp,otp_got) == false || verification(password,re_password) == false){
        alert("Check field properly")
        return
    }
    let response = await fetch('/sign', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({email, username,password})
    })

    let data = await response.json()

    if(data.status == 200){
        otp = null
        sessionStorage.setItem('username' , username)
        window.location.href = '/rozgaarready'
    }else{
        alert("User Name already exists")
    }
    document.getElementById('email').value = ''
    document.getElementById('otp').value = ''
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    document.getElementById('re-password').value = ''
})