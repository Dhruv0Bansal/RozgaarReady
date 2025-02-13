const form = document.querySelector('form')

function validateUsername(username) {
    const usernameRegex = /^[a-z0-9_]+$/; // Regex pattern for valid characters
    return usernameRegex.test(username) && !username.includes(' '); // Check for spaces explicitly
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (validateUsername(username) == false) {
        alert("Username contains lowercase, numbers , _ and avoid spaces")
        return
    }

    let response = await fetch('/log', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    const res = await response.json()
    if (res.status == 200) {
        sessionStorage.setItem('username', res.username)
        console.log(sessionStorage.getItem('username'))
        window.location.href = '/rozgaarready'
    } else {
        alert(res.message)
    }
})


const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        if (e.target.validity.valid) {
            e.target.classList.remove("input-error");
            e.target.classList.add("input-success");
            setTimeout(() => e.target.classList.remove("input-success"), 2000);
        } else {
            e.target.classList.add("input-error");
        }
    });
});

// Loading Animation
form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".loading-overlay").style.display = "flex";

    // Simulate API call
    setTimeout(() => {
        document.querySelector(".loading-overlay").style.display = "none";
        // Handle actual submission here
    }, 2000);
});

// Cursor Trail Animation
const cursorTrails = document.querySelectorAll(".cursor-trail");
let mouseX = 0,
    mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorTrails() {
    cursorTrails.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = `${mouseX - 4}px`;
            trail.style.top = `${mouseY - 4}px`;
            trail.style.opacity = "0.8";
        }, index * 50);
    });
    requestAnimationFrame(updateCursorTrails);
}

// Click Glow Effect
document.addEventListener("click", () => {
    cursorTrails.forEach((trail) => {
        trail.classList.add("cursor-glow");
        setTimeout(() => trail.classList.remove("cursor-glow"), 300);
    });
});

// Logo Hover Interaction
const logo = document.querySelector(".brand-logo");
if (logo) {
    logo.addEventListener("mouseenter", () => {
        cursorTrails.forEach((trail) => {
            trail.style.transform = "scale(1.5)";
            trail.style.background = "linear-gradient(45deg, #ffa700, #ff6b35)";
        });
    });

    logo.addEventListener("mouseleave", () => {
        cursorTrails.forEach((trail) => {
            trail.style.transform = "scale(1)";
            trail.style.background = "linear-gradient(45deg, #ff6b35, #ffa700)";
        });
    });
}

// Start animations
updateCursorTrails();

// Toggle Password Visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type");
        if (type === "password") {
            passwordInput.setAttribute("type", "text");
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.setAttribute("type", "password");
            togglePassword.textContent = "Show";
        }
    });
}
