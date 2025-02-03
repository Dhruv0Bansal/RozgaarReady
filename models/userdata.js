const mongoose = require('mongoose');

// Define the Education schema
const educationSchema = new mongoose.Schema({
    school: { type: String, default: '' },
    board: { type: String, default: '' },
    grade: { type: String, default: '' },
    passYear: { type: String, default: '' }
});

// Define the Work Experience schema
const workExperienceSchema = new mongoose.Schema({
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    year: { type: String, default: '' },
    city: { type: String, default: '' }
});

// Define the Personal Project schema
const personalProjectSchema = new mongoose.Schema({
    projectName: { type: String, default: '' },
    techStack: { type: String, default: '' },
    role: { type: String, default: '' },
    description: { type: String, default: '' }
});

// Define the Position schema
const positionSchema = new mongoose.Schema({
    position: { type: String, default: '' },
    tenure: { type: String, default: '' }
});

// Define the Achievement schema
const achievementSchema = new mongoose.Schema({
    description: { type: String, default: '' },
    eventDates: { type: String, default: '' }
});

// Define the main User schema
const userSchema = new mongoose.Schema({
    username : { type: String, required : true , unique : true },
    mainDetails: {
        username: { type: String, default: '' },
        id: { type: String, default: '' },
        institute: { type: String, default: '' },
        course: { type: String, default: '' },
        branch: { type: String, default: '' },
        cgpa: { type: String, default: '' },
        currYear: { type: String, default: '' },
        contact: { type: String, default: '' },
        offEmail: { type: String, default: '' },
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' }
    },
    education:[educationSchema],
    workExperience:[workExperienceSchema],
    personalProjects:[personalProjectSchema],
    techSkills:{
        languages:{type:String, default:''},
        devTools:{type:String, default:''},
        frameworks:{type:String, default:''},
        cloudDb:{type:String, default:''},
        softskills:{type:String, default:''},
        coursework:{type:String, default:''},
        interestArea:{type:String, default:''}
    },
    responsibility:[positionSchema],
    achievements:[achievementSchema]
});

// Create the User model
const User = mongoose.model('user_info', userSchema);

module.exports = User;
