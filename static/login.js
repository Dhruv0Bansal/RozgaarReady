const form = document.querySelector('form')

function validateUsername(username) {
    const usernameRegex = /^[a-z0-9_]+$/; // Regex pattern for valid characters
    return usernameRegex.test(username) && !username.includes(' '); // Check for spaces explicitly
}

form.addEventListener('submit', async (event)=>{
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if(validateUsername(username) == false){
        alert("Username contains lowercase, numbers , _ and avoid spaces")
        return
    }

    let response = await fetch('/log', {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({username,password})
    })

    const res = await response.json()
    if(res.status == 200){
        sessionStorage.setItem('username' , res.username)
        console.log(sessionStorage.getItem('username'))
        window.location.href = '/rozgaarready'
    }else{
        alert("Invalid Details!1")
    }
    console.log(res)
})