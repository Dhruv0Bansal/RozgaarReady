const welcomeContainer = document.querySelector('.welcome_container');
const buttons = document.querySelector('.buttons');
const boxes = document.querySelector('.boxes');
const boxElements = document.querySelectorAll('.box');

let hasScrolledDown = false;
let lastScrollTime = 0;

function handleScroll() {
    const scrollPosition = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolledToBottom = scrollPosition + clientHeight >= scrollHeight;
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastScrollTime;
    lastScrollTime = currentTime;

    if (scrollPosition > 20 && !hasScrolledDown) { // Reduced scroll limit
        welcomeContainer.classList.add('hidden');
        buttons.classList.add('hidden');

        boxes.style.opacity = "1";
        boxes.style.transform = "translateY(0)";

        hasScrolledDown = true;
    } else if (scrollPosition < 20 && hasScrolledDown) { // Reduced scroll limit
        welcomeContainer.classList.remove('hidden');
        buttons.classList.remove('hidden');

        boxes.style.opacity = "0";
        boxes.style.transform = "translateY(50px)";

        boxElements.forEach(box => box.classList.remove('show'));

        hasScrolledDown = false;
    }

    if (hasScrolledDown) {
        boxElements.forEach((box, index) => {
            const boxTop = box.getBoundingClientRect().top;
            const delay = 10;  // Dynamically adjust delay based on scroll speed
            if (boxTop < window.innerHeight * 0.85) {
                setTimeout(() => {
                    box.classList.add('show');
                }, index * delay);
            }
        });
    }
}

window.addEventListener('scroll', handleScroll);