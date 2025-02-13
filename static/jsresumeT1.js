async function getData(username) {
    let response = await fetch(`/populate/${username}`);
    let data = await response.json()
    document.querySelector('.username').innerText = data.mainDetails.username;
    document.querySelector('.contact').innerHTML = `<i class='bx bxs-phone'></i>${data.mainDetails.contact}`;
    document.querySelector('.offEmail').innerHTML = `<i class='bx bxs-envelope'></i>${data.mainDetails.offEmail}`;
    document.querySelector('.linkedin').href = data.mainDetails.linkedin;
    document.querySelector('.github').href = data.mainDetails.github;
    const idElement = document.querySelector('.id');
    if (idElement) idElement.innerText = data.mainDetails.id;
    
    const courseElement = document.querySelector('.course');
    if (courseElement) courseElement.innerText = data.mainDetails.course;
    
    const branchElement = document.querySelector('.branch');
    if (branchElement) branchElement.innerText = data.mainDetails.branch;

    const emailElement = document.querySelector('.email');
    if (emailElement) emailElement.innerHTML = `<i class='bx bxs-envelope'></i>${data.email}`;

    //Inserting Education details
    if (data.education.length == 0) {
        let data = document.querySelectorAll('.edu-head');
        data.forEach(data => {
            data.style.display = "none";
        })
    } else {
        data.education.forEach(edu => {
            let d = document.createElement('div')
            d.classList.add('subEdu')
            d.innerHTML = `
                <div class="flex">
                    <h3 class="playfair-display-bold">• ${edu.school}</h6>
                    <p class="p-class">${edu.passYear}</p>
                </div>
                <div class="flex">
                    <p class="p-class">&nbsp &nbsp${edu.board}</p>
                    <p class="p-class"><b>CGPA/Percentage</b> : ${edu.grade}</p>
                </div>
            `
            document.querySelector('.education').append(d)
        })
    }

    //Inserting Work Experience
    if (data.workExperience.length == 0) {
        let data = document.querySelectorAll('.work-head');
        data.forEach(data => {
            data.style.display = "none";
        })
    } else {
        data.workExperience.forEach(work => {
            let d = document.createElement('div')
            d.classList.add('workExp')
            d.innerHTML = `
            <div class="flex">
                <h3 class="playfair-display-bold">• ${work.company}</h3>
                <p class="p-class">${work.year}</p>
            </div>
            <div class="flex-align-items">
                <p class="manuale p-class">&nbsp &nbsp${work.role}</p>
                <p class="p-class">${work.city}</p>
            </div>
            `
            document.querySelector('.workExperience').append(d)
        })
    }

    //Inserting Project Details!!
    if (data.personalProjects.length == 0) {
        let d = document.querySelectorAll('.project-head');
        d.forEach(d => {
            d.style.display = "none";
        })
    } else {
        data.personalProjects.forEach(project => {
            let d = document.createElement('div')
            d.classList.add('subProject')
            d.innerHTML = `
                <div class="d-flex">
                    <span class="playfair-display-bold flex">• ${project.projectName} | </span>  <span class="flex playfair-display-regular"> &nbsp${project.techStack}</span>
                </div>
                <p class="p-class">&nbsp &nbsp<b>Role : </b>${project.role}</p>
                <p class="p-class">&nbsp &nbsp${project.description}</p>
            `
            document.querySelector('.projects').append(d)
        })
    }

    //Inserting Skills
    const techSkills = data.techSkills;
    for (const key in techSkills) {
        const inputField = document.querySelector(`.${key}`);
        if (inputField) {
            inputField.innerText = techSkills[key] || '';
        }
    }

    //Inserting Postion of Responsibility
    if (data.responsibility.length == 0) {
        let d = document.querySelectorAll('.position-head');
        d.forEach(d => {
            d.style.display = "none";
        })
    } else {
        data.responsibility.forEach(position => {
            let d = document.createElement('div')
            d.classList.add('subposition')
            d.classList.add('flex')
            d.innerHTML = `
                <p class="p-class playfair-display-bold">• <b>${position.position}</b></p>
                <p class = "p-class">${position.tenure}</p>
            `
            document.querySelector('.extra-curricular').append(d)
        })
    }

    //Inserting Acheivements
    if (data.achievements.length == 0) {
        let d = document.querySelectorAll('.acheivement-head');
        d.forEach(d => {
            d.style.display = "none";
        })
    } else {
        data.achievements.forEach(acheivement => {
            let d = document.createElement('div')
            d.classList.add('acheivement')
            d.classList.add('flex')
            d.innerHTML = `
                <p class="p-class playfair-display-bold">• <b>${acheivement.description}</b></p>
                <p class = "p-class">${acheivement.eventDates}</p>
            `
            document.querySelector('.achievements').append(d)
        })
    }
}

getData(sessionStorage.username);

document.getElementById('generatePdf').addEventListener('click', async () => {
    let content = document.getElementById('contain')
    console.log(content)
    const response = await fetch('/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: content.innerHTML })
    });
    let reply = await response.json();
    console.log(reply)
});