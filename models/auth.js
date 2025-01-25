const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true, // Automatically convert to lowercase
        required: true,  // Make it required
        unique: true,    // Ensure uniqueness in the database
        match: /^[a-z0-9_]+$/ // Regex: only letters, numbers, and underscores
    },
    password: {
        type: String,
        required: true // Make it required
    }
});

module.exports = mongoose.model('auth', authSchema);
