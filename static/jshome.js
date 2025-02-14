if(sessionStorage.username == null){
    window.location.href = '/login'
}

// Get all buttons and dialogs
const buttons = document.querySelectorAll('.nav-button');
const dialogs = document.querySelectorAll('.dialog');
const hoverSound = document.getElementById('hover-sound');

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Play hover sound
        hoverSound.play();

        // Hide all dialogs
        dialogs.forEach(dialog => {
            dialog.style.display = 'none';
        });

        // Show the corresponding dialog
        const dialogId = button.getAttribute('data-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = 'block';
            document.querySelector('.dialogs-container').style.display = 'block';
        }
    });

    button.addEventListener('mouseleave', () => {
        // Hide the dialog when mouse leaves the button
        const dialogId = button.getAttribute('data-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = 'none';
            document.querySelector('.dialogs-container').style.display = 'none';
        }
    });
});

// Hide dialogs when mouse leaves the dialog container
document.querySelector('.dialogs-container').addEventListener('mouseleave', () => {
    dialogs.forEach(dialog => {
        dialog.style.display = 'none';
    });
    document.querySelector('.dialogs-container').style.display = 'none';
});

// Get all buttons

// Add click event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Determine the endpoint based on the button's data-dialog attribute or text content
        let endpoint = '';

        switch (button.getAttribute('data-dialog')) {
            case 'update-user-dialog':
                endpoint = '/rozgaarready/update-user';
                break;
            case 'resume-templates-dialog':
                endpoint = '/rozgaarready/resume-templates';
                break;
            default:
                console.error('Unknown button clicked');
                return;
        }

        // Redirect to the specified endpoint
        window.location.href = endpoint;
    });
});