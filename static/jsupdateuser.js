// Function to add new education section
document.getElementById('add-education').addEventListener('click', function(event) {
    event.preventDefault();
    const eduDiv = document.createElement('div');
    eduDiv.className = 'edu';
    eduDiv.innerHTML = `
        <label for="school">School</label>
        <input type="text" name="school" class="school">

        <label for="board">Board</label>
        <input type="text" name="board" class="board">

        <label for="grade">Grade</label>
        <input type="text" name="grade" class="grade">

        <label for="pass-year">Passing Year</label>
        <input type="text" name="pass-year" class="pass-year">

        <button class='delete-button'>Delete</button>
    `;
    document.querySelector('.education').appendChild(eduDiv);
    eduDiv.querySelector('.delete-button').addEventListener('click', function() {
        eduDiv.remove();
    });
});

// Function to add new work experience section
document.getElementById('add-work-experience').addEventListener('click', function(event) {
    event.preventDefault();
    const workDiv = document.createElement('div');
    workDiv.className = 'work';
    workDiv.innerHTML = `
        <label for="company">Company Name</label>
        <input type="text" name="company" class="company">

        <label for="role">Role</label>
        <input type="text" name="role" class="role">

        <label for="year">Year</label>
        <input type="text" name="year" class="year">

        <label for="city">City</label>
        <input type="text" name="city" class="city">

        <button class='delete-button'>Delete</button>
    `;
    document.querySelector('.work-experience').appendChild(workDiv);
    workDiv.querySelector('.delete-button').addEventListener('click', function() {
        workDiv.remove();
    });
});

// Function to add new personal project section
document.querySelector('.add-project').addEventListener('click', function(event) {
    event.preventDefault();
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.innerHTML = `
        <label for='project-name'>Project Name</label>
        <input type='text' name='project-name' class='project-name'>

        <label for='tech-stack'>Tech Stack Used For Building the Project</label>
        <input type='text' name='tech-stack' class='tech-stack'>

        <label for='role'>Your Role</label>
        <input type='text' name='role' class='role'>

        <label for='description'>Project Description</label>
        <input type='text' name='description' class='description'>

        <button class='delete-button'>Delete</button>
    `;
    document.querySelector('.personal-project').appendChild(projectDiv);
    projectDiv.querySelector('.delete-button').addEventListener('click', function() {
        projectDiv.remove();
    });
});

// Function to add new responsibility section
document.querySelector('.add-responsibility').addEventListener('click', function(event) {
    event.preventDefault();
    const responsibilityDiv = document.createElement('div');
    responsibilityDiv.className = 'responsibility';
    responsibilityDiv.innerHTML = `
        <label for='position'>Position, Club or Event</label>
        <input type='text' name='position' class='position' placeholder='Eg. Executive, CS Club'>

        <label for='tenure'>Position Tenure</label>
        <input type='text' name='tenure' class='tenure'>

        <button class='delete-button'>Delete Position</button>
    `;
    document.querySelector('.responsibility-section').appendChild(responsibilityDiv);
    responsibilityDiv.querySelector('.delete-button').addEventListener('click', function() {
        responsibilityDiv.remove();
    });
});

// Function to add new achievement section
document.querySelector('.add-achievement').addEventListener('click', function(event) {
    event.preventDefault();
    const achievementDiv = document.createElement('div');
    achievementDiv.className = 'achievement';
    achievementDiv.innerHTML = `
        <label for='achievement-description'>Achievement Description</label>
        <input type='text' name='achievement-description' class='achievement-description' placeholder='Won CodeGolf at Sphinx'>
        
        <label for='event-dates'>Event Dates</label>
        <input type='text' name='event-dates' class='event-dates'>
        
        <button class='delete-button'>Delete Achievement</button>
    `;
    document.querySelector('.acheivements').appendChild(achievementDiv);
    achievementDiv.querySelector('.delete-button').addEventListener('click', function() {
        achievementDiv.remove();
    });
});

// Collect data into JSON object on form submission
document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const data = {
        username : sessionStorage.username,
        mainDetails: {
            username: document.getElementById('username').value,
            id: document.getElementById('id').value,
            institute: document.getElementById('institute').value,
            course: document.getElementById('course').value,
            branch: document.getElementById('branch').value,
            cgpa: document.getElementById('cgpa').value,
            currYear: document.getElementById('currYear').value,
            contact: document.getElementById('contact').value,
            offEmail: document.getElementById('offEmail').value,
            github: document.getElementById('github').value,
            linkedin: document.getElementById('linkedin').value
        },
        techSkills: {
            languages: document.getElementById('languages').value,
            devTools: document.getElementById('devTools').value,
            frameworks: document.getElementById('frameworks').value,
            cloudDb: document.getElementById('cloudDb').value,
            softskills: document.getElementById('softskills').value,
            coursework: document.getElementById('coursework').value,
            interestArea: document.getElementById('interestArea').value
        },
        education: Array.from(document.querySelectorAll('.edu')).map(edu => ({
            school: edu.querySelector('.school').value,
            board: edu.querySelector('.board').value,
            grade: edu.querySelector('.grade').value,
            passYear: edu.querySelector('.pass-year').value
        })),
        workExperience: Array.from(document.querySelectorAll('.work')).map(work => ({
            company: work.querySelector('.company').value,
            role: work.querySelector('.role').value,
            year: work.querySelector('.year').value,
            city: work.querySelector('.city').value
        })),
        personalProjects: Array.from(document.querySelectorAll('.project')).map(project => ({
            projectName: project.querySelector('.project-name').value,
            techStack: project.querySelector('.tech-stack').value,
            role: project.querySelector('.role').value,
            description: project.querySelector('.description').value
        })),
        responsibility: Array.from(document.querySelectorAll('.responsibility')).map(responsibility => ({
            position: responsibility.querySelector('.position').value,
            tenure: responsibility.querySelector('.tenure').value
        })),
        achievements: Array.from(document.querySelectorAll('.achievement')).map(achievement => ({
            description: achievement.querySelector('.achievement-description').value,
            eventDates: achievement.querySelector('.event-dates').value
        }))
    };
    console.log(data)
    let response = await fetch('/update-user', {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
    })
    let reply = await response.json()
    alert(reply.message)
});

// Function to populate the entire form based on JSON data
function populateForm(data) {
    const mainDetails = data.mainDetails;

    // Populate main details
    for (const key in mainDetails) {
        const inputField = document.getElementById(key);
        if (inputField) {
            inputField.value = mainDetails[key] || '';  // Set to '' if empty
        }
    }

    // Populate techFields
    const techSkills = data.techSkills;
    for (const key in techSkills) {
        const inputField = document.getElementById(key);
        if (inputField) {
            inputField.value = techSkills[key] || '';  // Set to '' if empty
        }
    }

    // Populate education section
    const educationContainer = document.querySelector('.education');
    data.education.forEach(edu => {
        if (Object.values(edu).every(value => value)) {  // Check if all fields are filled
            const eduDiv = document.createElement('div');
            eduDiv.className = 'edu';
            eduDiv.innerHTML = `
                <label for="school">School</label>
                <input type="text" name="school" class="school" value="${edu.school}">
                
                <label for="board">Board</label>
                <input type="text" name="board" class="board" value="${edu.board}">
                
                <label for="grade">Grade</label>
                <input type="text" name="grade" class="grade" value="${edu.grade}">
                
                <label for="pass-year">Passing Year</label>
                <input type="text" name="pass-year" class="pass-year" value="${edu.passYear}">
                
                <button class='delete-button'>Delete</button>
            `;
            educationContainer.appendChild(eduDiv);

            // Add event listener for delete button
            eduDiv.querySelector('.delete-button').addEventListener('click', function() {
                eduDiv.remove();
            });
        }
    });

    // Populate work experience section
    const workExperienceContainer = document.querySelector('.work-experience');
    data.workExperience.forEach(work => {
        if (Object.values(work).some(value => value)) {  // Check if any field is filled
            const workDiv = document.createElement('div');
            workDiv.className = 'work';
            workDiv.innerHTML = `
                <label for="company">Company Name</label>
                <input type="text" name="company" class="company" value="${work.company || ''}">
                
                <label for="role">Role</label>
                <input type="text" name="role" class="role" value="${work.role || ''}">
                
                <label for="year">Year</label>
                <input type="text" name="year" class="year" value="${work.year || ''}">
                
                <label for="city">City</label>
                <input type="text" name="city" class="city" value="${work.city || ''}">
                
                <button class='delete-button'>Delete</button>
            `;
            workExperienceContainer.appendChild(workDiv);

            // Add event listener for delete button
            workDiv.querySelector('.delete-button').addEventListener('click', function() {
                workDiv.remove();
            });
        }
    });

    // Populate personal projects section
    const projectsContainer = document.querySelector('.personal-project');
    data.personalProjects.forEach(project => {
        if (Object.values(project).some(value => value)) {  // Check if any field is filled
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            projectDiv.innerHTML = `
                <label for='project-name'>Project Name</label>
                <input type='text' name='project-name' class='project-name' value="${project.projectName || ''}">

                <label for='tech-stack'>Tech Stack Used For Building the Project</label>
                <input type='text' name='tech-stack' class='tech-stack' value="${project.techStack || ''}">

                <label for='role'>Your Role</label>
                <input type='text' name='role' class='role' value="${project.role || ''}">

                <label for='description'>Project Description</label>
                <input type='text' name='description' class='description' value="${project.description || ''}">

                <button class='delete-button'>Delete</button>
            `;
            projectsContainer.appendChild(projectDiv);

            // Add event listener for delete button
            projectDiv.querySelector('.delete-button').addEventListener('click', function() {
                projectDiv.remove();
            });
        }
    });

    // Populate responsibilities section
    const responsibilitiesContainer = document.querySelector('.responsibility-section');
    data.responsibility.forEach(responsibility => {
        if (Object.values(responsibility).some(value => value)) {  // Check if any field is filled
            const responsibilityDiv = document.createElement('div');
            responsibilityDiv.className = 'responsibility';
            responsibilityDiv.innerHTML = `
                <label for='position'>Position, Club or Event</label>
                <input type='text' name='position' class='position' placeholder='Eg. Executive, CS Club' value="${responsibility.position || ''}">

                <label for='tenure'>Position Tenure</label>
                <input type='text' name='tenure' class='tenure' value="${responsibility.tenure || ''}">

                <button class='delete-button'>Delete Position</button>
            `;
            responsibilitiesContainer.appendChild(responsibilityDiv);

            // Add event listener for delete button
            responsibilityDiv.querySelector('.delete-button').addEventListener('click', function() {
                responsibilityDiv.remove();
            });
        }
    });

    // Populate achievements section
    const achievementsContainer = document.querySelector('.acheivements');
    data.achievements.forEach(achievement => {
        if (Object.values(achievement).some(value => value)) {  // Check if any field is filled
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement';
            achievementDiv.innerHTML = `
                <label for='achievement-description'>Achievement Description</label>
                <input type='text' name='achievement-description' class='achievement-description' placeholder='Won CodeGolf at Sphinx' value="${achievement.description || ''}">

                <label for='event-dates'>Event Dates</label>
                <input type='text' name='event-dates' class='event-dates' value="${achievement.eventDates || ''}">

                <button class='delete-button'>Delete Achievement</button>
            `;
            achievementsContainer.appendChild(achievementDiv);

            // Add event listener for delete button
            achievementDiv.querySelector('.delete-button').addEventListener('click', function() {
                achievementDiv.remove();
            });
        }
    });
}

async function enterData(){
    let response = await fetch(`/populate/${sessionStorage.username}`)
    let reply = await response.json();
    populateForm(reply)
}

enterData()