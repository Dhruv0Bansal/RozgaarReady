async function getData(username) {
    let response = await fetch(`/populate/${username}`);
    let data = await response.json()
    document.querySelector('.username').innerText = data.mainDetails.username;
    document.querySelector('.contact').innerText = `${data.mainDetails.contact}`;
    document.querySelector('.offEmail').innerHTML = `<i class='bx bx-envelope' ></i>${data.mainDetails.offEmail}`;
    document.querySelector('.linkedin').href = data.mainDetails.linkedin;
    document.querySelector('.github').href = data.mainDetails.github;

    //Inserting Education details
    if(data.education.length == 0){
        let data = document.querySelectorAll('.edu-head');
        data.forEach(data=>{
            data.style.display = "none";
        })
    }else{
        data.education.forEach(edu=>{
            let d = document.createElement('div')
            d.classList.add('subEdu')
            d.innerHTML = `
                <div class="flex">
                    <h3>${edu.school}</h6>
                    <p>${edu.board}</p>
                </div>
                <div class="flex">
                    <p>${edu.passYear}</p>
                    <p>CGPA : ${edu.grade}</p>
                </div>
            `
            document.querySelector('.education').append(d)
        })
    }

    //Inserting Work Experience
    if(data.workExperience.length == 0){
        let data = document.querySelectorAll('.work-head');
        data.forEach(data=>{
            data.style.display = "none";
        })
    }else{
        data.workExperience.forEach(edu=>{
            let d = document.createElement('div')
            d.classList.add('subEdu')
            d.innerHTML = `
                <div class="flex">
                    <h3>${edu.school}</h6>
                    <p>${edu.board}</p>
                </div>
                <div class="flex">
                    <p>${edu.passYear}</p>
                    <p>CGPA : ${edu.grade}</p>
                </div>
            `
            document.querySelector('.education').append(d)
        })
    }

    //Inserting Project Details!!
    if(data.personalProjects.length == 0){
        let d = document.querySelectorAll('.project-head');
        d.forEach(d=>{
            d.style.display = "none";
        })
    }else{
        data.personalProjects.forEach(project=>{
            let d = document.createElement('div')
            d.classList.add('subProject')
            d.innerHTML = `
                <h3>${project.projectName}</h3>
                <p>${project.role}</p>
                <p>${project.techStack}</p>
                <p>${project.description}</p>
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
    if(data.responsibility.length == 0){
        let d = document.querySelectorAll('.position-head');
        d.forEach(d=>{
            d.style.display = "none";
        })
    }else{
        data.responsibility.forEach(position=>{
            let d = document.createElement('div')
            d.classList.add('subposition')
            d.classList.add('flex')
            d.innerHTML = `
                <p>${position.position}</p>
                <p>${position.tenure}</p>
            `
            document.querySelector('.extra-curricular').append(d)
        })
    }

    //Inserting Acheivements
    if(data.achievements.length == 0){
        let d = document.querySelectorAll('.acheivement-head');
        d.forEach(d=>{
            d.style.display = "none";
        })
    }else{
        data.achievements.forEach(acheivement=>{
            let d = document.createElement('div')
            d.classList.add('acheivement')
            d.classList.add('flex')
            d.innerHTML = `
                <p>${acheivement.description}</p>
                <p>${acheivement.eventDates}</p>
            `
            document.querySelector('.achievements').append(d)
        })
    }
}

getData(sessionStorage.username);

// Entering Initail Details


// {
//     "mainDetails": {
//       "username": "Pritam Barman",
//       "id": "2023UCP1608",
//       "institute": "MNIT Jaipur",
//       "course": "BTECH",
//       "branch": "CSE",
//       "cgpa": "8.59",
//       "currYear": "2025",
//       "contact": "8812032614",
//       "offEmail": "2023ucp1608@mnit.ac.in",
//       "github": "http://localhost:3000/rozgaarready/update-user",
//       "linkedin": "http://localhost:3000/rozgaarready/update-user"
//     },
//     "techSkills": {
//       "languages": "C++, Python",
//       "devTools": "git, github",
//       "frameworks": "Node.js, Numpy",
//       "cloudDb": "MongoDB",
//       "softskills": "communication Skill",
//       "coursework": "OPPS, ML",
//       "interestArea": "Image Processing"
//     },
//     "_id": "679cd58a8f4c2e1f8ecc614f",
//     "username": "pritamzzz",
//     "education": [
//       {
//         "school": "MNIT",
//         "board": "CENTRAL",
//         "grade": "8.59",
//         "passYear": "2027",
//         "_id": "679ce75b359f8712457db6c8"
//       },
//       {
//         "school": "KVS Maligaon",
//         "board": "CBSE",
//         "grade": "9.2",
//         "passYear": "2023",
//         "_id": "679ce75b359f8712457db6c9"
//       }
//     ],
//     "workExperience": [],
//     "personalProjects": [
//       {
//         "projectName": "Rozgaar Ready",
//         "techStack": "HTML, CSS, Javascript, Node.js, Express.js",
//         "role": "Backend Developer",
//         "description": "this project is awesome",
//         "_id": "679ce75b359f8712457db6ca"
//       }
//     ],
//     "responsibility": [
//       {
//         "position": "hello",
//         "tenure": "hellooo",
//         "_id": "679ce75b359f8712457db6cb"
//       },
//       {
//         "position": "wfoubfowc j",
//         "tenure": "cwlbow ",
//         "_id": "679ce75b359f8712457db6cc"
//       }
//     ],
//     "achievements": [
//       {
//         "description": "ouhwbv0wb",
//         "eventDates": "wovubwb",
//         "_id": "679ce75b359f8712457db6cd"
//       },
//       {
//         "description": "iug9ch 9c",
//         "eventDates": "oubowefcb",
//         "_id": "679ce75b359f8712457db6ce"
//       }
//     ],
//     "__v": 0
//   }